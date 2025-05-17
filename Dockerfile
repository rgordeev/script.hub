# syntax=docker/dockerfile:1
# Базовый образ с Python 3.9
FROM python:3.9-slim

# Отключаем интерактивные диалоги APT и предупреждения pip
ENV DEBIAN_FRONTEND=noninteractive \
    PIP_DISABLE_PIP_VERSION_CHECK=1

# -- Системные зависимости ----------------------------------------------------
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        xvfb \
        fluxbox \
        x11vnc \
        novnc \
        websockify \
        python3-pyqt5 \
        libgl1-mesa-glx \
        build-essential \
        python3-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Создаем символическую ссылку для PyQt5
RUN ln -s /usr/lib/python3/dist-packages/PyQt5 /usr/local/lib/python3.9/site-packages/PyQt5

# -- Python-зависимости --------------------------------------------------------
COPY requirements.txt .
RUN pip install -U pip --no-cache-dir && \
    pip install --no-cache-dir PyQt5-sip==12.11.1 && \
    pip install --no-cache-dir -r requirements.txt

# -- Непривилегированный пользователь -----------------------------------------
RUN groupadd -r app && useradd --no-log-init -m -r -g app app

# -- Приложение ---------------------------------------------------------------
COPY app/ /app/
WORKDIR /app
RUN chown -R app:app /app

# Скрипт запуска
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh && chown app:app /usr/local/bin/start.sh

USER app

# VNC (5900) и noVNC (6080)
EXPOSE 6080 5900

CMD ["start.sh"]
