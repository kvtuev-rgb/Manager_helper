# Подключение Git и GitHub к проекту Manager Helper

Пошаговая инструкция по инициализации репозитория и привязке к GitHub.

---

## 1. Установите Git (если ещё не установлен)

- Скачайте: https://git-scm.com/download/win  
- Установите с настройками по умолчанию.  
- Проверка в терминале: `git --version`

---

## 2. Инициализируйте репозиторий в папке проекта

Откройте терминал в папке проекта (например, в Cursor: **Terminal → New Terminal**) и выполните:

```bash
cd "c:\Users\Kostik\Desktop\Обучение - Альфа\Вайбаналитика\Cursor_manager_helper\Manager_Helper"
git init
```

Появится сообщение: `Initialized empty Git repository in ...`

---

## 3. Добавьте файл .gitignore

Чтобы не попадали в репозиторий служебные и собранные файлы, в корне проекта должен быть файл **`.gitignore`** со следующим содержимым:

```
node_modules/
dist/
*.exe
.DS_Store
Thumbs.db
*.log
.env
.env.local
```

Если файла нет — создайте его в корне проекта с этими строками.

---

## 4. Первый коммит

```bash
git add .
git status
git commit -m "Initial commit: Manager Helper — настройка приложения"
```

---

## 5. Создайте репозиторий на GitHub

1. Зайдите на https://github.com и войдите в аккаунт.  
2. Нажмите **«+» → «New repository»**.  
3. Укажите:
   - **Repository name:** например `Manager_Helper` или `manager-helper`
   - **Description:** по желанию (например, «AI Technical Assistant — настройка приложения»)
   - **Public** или **Private**
   - **НЕ** ставьте галочки «Add a README», «Add .gitignore», «Choose a license» — репозиторий должен быть пустым.  
4. Нажмите **«Create repository»**.

---

## 6. Подключите локальный проект к GitHub

На странице нового репозитория GitHub скопируйте URL (кнопка **Code**, затем **HTTPS**), например:

`https://github.com/ВАШ_ЛОГИН/Manager_Helper.git`

В терминале в папке проекта выполните (подставьте свой URL):

```bash
git remote add origin https://github.com/ВАШ_ЛОГИН/Manager_Helper.git
```

Проверка:

```bash
git remote -v
```

Должны быть строки: `origin` и ваш URL (fetch и push).

---

## 7. Отправьте код на GitHub

Если ветка по умолчанию на GitHub — `main`:

```bash
git branch -M main
git push -u origin main
```

Если при создании репозитория GitHub предложил другую ветку (например, `master`), используйте её имя вместо `main`.

При первом `git push` может открыться окно входа в GitHub (логин/пароль или токен). Для HTTPS часто нужен **Personal Access Token** вместо пароля: GitHub → Settings → Developer settings → Personal access tokens → создать токен с правом `repo`.

---

## 8. Дальнейшая работа

- Вносите изменения в коде, затем:
  ```bash
  git add .
  git status
  git commit -m "Краткое описание изменений"
  git push
  ```
- Обновить версию в `package.json` при релизах (например, `1.0.1`, `1.1.0`).
- При желании можно ставить теги для версий: `git tag v1.0.0` и `git push origin v1.0.0`.

---

## Краткая шпаргалка

| Действие              | Команда |
|-----------------------|--------|
| Статус                | `git status` |
| Добавить все файлы    | `git add .` |
| Коммит                 | `git commit -m "сообщение"` |
| Отправить на GitHub   | `git push` |
| Забрать изменения     | `git pull` |
| Посмотреть remote     | `git remote -v` |

После выполнения шагов 1–7 проект будет подключён к Git и к репозиторию на GitHub.
