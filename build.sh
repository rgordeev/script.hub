#!/bin/bash

# Остановка всех контейнеров
docker stop $(docker ps -a -q)

# Очистка неиспользуемых ресурсов
docker system prune -f

# Сборка образа с увеличенными лимитами памяти
docker build --memory=4g --memory-swap=6g -t script-hub . 