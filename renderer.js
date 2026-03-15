(function () {
  const statusMic = document.getElementById('status-mic');
  const statusFile = document.getElementById('status-file');
  const btnMic = document.getElementById('btn-mic');
  const btnFile = document.getElementById('btn-file');

  function setStatus(el, text, isOk) {
    el.textContent = text;
    el.className = 'status' + (text ? (isOk ? ' ok' : ' err') : '');
  }

  // Микрофон
  btnMic.addEventListener('click', async () => {
    setStatus(statusMic, 'Проверка доступа…', true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((t) => t.stop());
      setStatus(statusMic, 'Доступ к микрофону разрешён', true);
    } catch (e) {
      setStatus(statusMic, 'Доступ запрещён или ошибка: ' + (e.message || e.name), false);
    }
  });

  // Файл контекста: выбор → чтение содержимого по шагам
  let loadedContextFiles = [];

  btnFile.addEventListener('click', async () => {
    if (typeof window.api === 'undefined' || !window.api.openFileDialog) {
      setStatus(statusFile, 'Функция доступна в приложении', false);
      return;
    }
    setStatus(statusFile, 'Выбор файлов…', true);
    try {
      const paths = await window.api.openFileDialog();
      if (paths.length === 0) {
        setStatus(statusFile, 'Файлы не выбраны', false);
        return;
      }
      setStatus(statusFile, 'Чтение файлов…', true);
      loadedContextFiles = [];
      const results = [];
      for (const filePath of paths) {
        if (typeof window.api.readFileContent !== 'function') break;
        const result = await window.api.readFileContent(filePath);
        if (result.ok) {
          loadedContextFiles.push({ name: result.name, path: result.path, content: result.content });
          results.push(result.name + ' (' + (result.content.length || 0) + ' симв.)');
        } else {
          results.push(result.name + ': ' + (result.error || 'ошибка'));
        }
      }
      if (loadedContextFiles.length > 0) {
        setStatus(statusFile, 'Прочитано: ' + loadedContextFiles.length + ' файл(ов). ' + results.join('; '), true);
      } else {
        setStatus(statusFile, results.length ? results.join('; ') : 'Не удалось прочитать файлы', false);
      }
    } catch (e) {
      setStatus(statusFile, 'Ошибка: ' + (e.message || e.name), false);
    }
  });
})();
