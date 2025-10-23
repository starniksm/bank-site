# Банковский сайт для рассмотрения заявок по кредиту физических лиц

Веб-приложение для дипломной работы 

## Функциональность

- ПОТОМ ЗАПОЛНИТЬ

## Технологии (Добавить по мере масштабирования)

- Backend: Django 4.2
- Frontend: HTML5, CSS3, JavaScript
- База данных: SQLite

## Установка и запуск

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd bank_site
```

### 2. Создание виртуального окружения

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# или
venv\Scripts\activate  # Windows
```

### 3. Установка зависимостей

```bash
pip install -r requirements.txt
```

### 4. Применение миграций

```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Создание суперюзера (опционально)

```bash
python manage.py createsuperuser
```

### 6. Запуск сервера

```bash
python manage.py runserver
```

### 7. Доступ к приложению

Откройте браузер и перейдите по адресу: http://127.0.0.1:8000/

Админ-панель доступна по адресу: http://127.0.0.1:8000/admin/