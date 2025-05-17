# Script Hub

Веб-приложение для запуска Python скриптов с PyQt интерфейсом в контейнере и отображения их через VNC в браузере.

## Требования

- Node.js 14+
- Docker
- Python 3.9+

## Установка и запуск

1. Клонируйте репозиторий:
```bash
git clone <repository-url>
cd script-hub
```

2. Установите зависимости React приложения:
```bash
npm install
```

3. Соберите Docker образ:
```bash
docker build -t script-hub .
```

4. Запустите Docker контейнер:
```bash
docker run -d -p 6080:6080 -p 5000:5000 script-hub
```

5. Запустите React приложение:
```bash
npm start
```

Приложение будет доступно по адресу http://localhost:3000

## Использование

1. Откройте приложение в браузере
2. Введите число в поле ввода PyQt формы
3. Нажмите кнопку "Конвертировать"
4. Результат будет сохранен в Excel файл
5. Нажмите кнопку "Скачать результат" для получения файла

## Архитектура

- Frontend: React приложение с noVNC клиентом
- Backend: Python приложение с PyQt интерфейсом
- Контейнеризация: Docker с Xvfb, Fluxbox и x11vnc
- API: Flask для скачивания файлов

## Технологии

- React
- PyQt5
- noVNC
- Docker
- Flask
- openpyxl
- num2words 