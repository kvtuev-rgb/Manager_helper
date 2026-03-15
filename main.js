const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 480,
    height: 520,
    minWidth: 400,
    minHeight: 420,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    show: false,
  });

  mainWindow.loadFile('index.html');
  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Диалог выбора файла контекста
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Документы', extensions: ['pdf', 'doc', 'docx', 'txt', 'md'] },
      { name: 'Все файлы', extensions: ['*'] },
    ],
  });
  return result.canceled ? [] : result.filePaths;
});

// Шаг 1: чтение текстовых файлов (.txt, .md)
async function readFileContent(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (ext === '.txt' || ext === '.md') {
      const content = await fs.readFile(filePath, 'utf-8');
      return { ok: true, content, name: path.basename(filePath), path: filePath };
    }
    if (ext === '.pdf') {
      const pdfParse = require('pdf-parse');
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);
      return { ok: true, content: data.text, name: path.basename(filePath), path: filePath };
    }
    if (ext === '.docx') {
      const mammoth = require('mammoth');
      const buffer = await fs.readFile(filePath);
      const result = await mammoth.extractRawText({ buffer });
      return { ok: true, content: result.value, name: path.basename(filePath), path: filePath };
    }
    return { ok: false, error: 'Неподдерживаемый формат: ' + ext };
  } catch (err) {
    return { ok: false, error: err.message || String(err), name: path.basename(filePath) };
  }
}

ipcMain.handle('read-file-content', (event, filePath) => readFileContent(filePath));
