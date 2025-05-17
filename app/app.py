import sys
import os
from PyQt5.QtWidgets import QApplication, QMainWindow, QWidget, QVBoxLayout, QLineEdit, QPushButton, QLabel
from PyQt5.QtCore import Qt
from num2words import num2words
from openpyxl import Workbook
from flask import Flask, send_file
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

class NumberConverter(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Конвертер чисел")
        self.setGeometry(100, 100, 400, 200)

        # Создание центрального виджета
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        layout = QVBoxLayout(central_widget)

        # Поле ввода
        self.input_field = QLineEdit()
        self.input_field.setPlaceholderText("Введите число")
        layout.addWidget(self.input_field)

        # Кнопка конвертации
        self.convert_button = QPushButton("Конвертировать")
        self.convert_button.clicked.connect(self.convert_number)
        layout.addWidget(self.convert_button)

        # Метка для результата
        self.result_label = QLabel("")
        layout.addWidget(self.result_label)

        self.output_file = "result.xlsx"

    def convert_number(self):
        try:
            number = int(self.input_field.text())
            words = num2words(number, lang='ru')
            
            # Создание Excel файла
            wb = Workbook()
            ws = wb.active
            ws['A1'] = words
            wb.save(self.output_file)
            
            self.result_label.setText(f"Результат сохранен в {self.output_file}")
        except ValueError:
            self.result_label.setText("Пожалуйста, введите корректное число")

@app.route('/download')
def download_file():
    return send_file("result.xlsx", as_attachment=True)

def run_flask():
    app.run(host='0.0.0.0', port=8000)

if __name__ == '__main__':
    # Запуск Flask в отдельном потоке
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()

    # Запуск PyQt приложения
    qt_app = QApplication(sys.argv)
    window = NumberConverter()
    window.show()
    sys.exit(qt_app.exec_()) 