#!/bin/bash

# Создаем директорию для X11
mkdir -p /tmp/.X11-unix

# Запуск Xvfb
Xvfb :99 -screen 0 1024x768x16 &
export DISPLAY=:99

# Ждем запуска Xvfb
sleep 2

# Запуск оконного менеджера
fluxbox &

# Запуск VNC сервера
x11vnc -display :99 -nopw -forever -shared &

# Запуск noVNC
websockify --web=/usr/share/novnc/ 6080 localhost:5900 &

# Запуск Python приложения
python app.py 