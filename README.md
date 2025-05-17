# Script Hub

Веб-приложение для конвертации чисел в слова с использованием PyQt5 и React.

## Описание

Приложение состоит из двух частей:
- Backend: Python приложение с PyQt5 для конвертации чисел и Flask API для скачивания результатов
- Frontend: React приложение с noVNC для отображения PyQt5 интерфейса в браузере

## Требования

- Docker
- Node.js 14+ и npm
- Python 3.9+

## Установка и запуск

### 1. Запуск Docker контейнера

```bash
# Сборка образа
docker build -t script-hub .

# Запуск контейнера
docker run -d -p 6080:6080 -p 5900:5900 -p 8000:8000 --name script-hub script-hub
```

### 2. Запуск React приложения

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start
```

Приложение будет доступно по адресу: http://localhost:3000

## Структура проекта

```
.
├── app/                    # Python backend
│   ├── app.py             # Основной файл приложения
│   └── requirements.txt   # Python зависимости
├── src/                   # React frontend
│   ├── App.js            # Основной компонент
│   └── App.css           # Стили
├── public/               # Статические файлы
├── Dockerfile           # Конфигурация Docker
├── start.sh            # Скрипт запуска контейнера
└── package.json        # Node.js зависимости
```

## Использование

1. Откройте http://localhost:3000 в браузере
2. В открывшемся окне VNC введите число в поле ввода
3. Нажмите кнопку "Конвертировать"
4. Для скачивания результата нажмите кнопку "Скачать результат"

## Порты

- 3000: React приложение
- 6080: noVNC WebSocket
- 5900: VNC сервер
- 8000: Flask API

## Разработка

### Backend

```bash
# Установка Python зависимостей
pip install -r app/requirements.txt

# Запуск Python приложения
python app/app.py
```

### Frontend

```bash
# Установка Node.js зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build
```

## Лицензия

WTFPL - Do What The Fuck You Want To Public License 