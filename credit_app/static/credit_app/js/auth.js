document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('authPhone');
    const authForm = document.getElementById('authForm');

    // Убедимся что placeholder есть
    phoneInput.setAttribute('placeholder', ' ');

    // Переменные для управления состоянием
    let isFirstInput = true;

    // Функция для форматирования телефона
    function formatPhoneNumber(value) {
        // Удаляем все нецифровые символы
        let numbers = value.replace(/\D/g, '');

        // Если это первый ввод и пользователь ввел цифру
        if (isFirstInput && numbers.length > 0) {
            numbers = '7' + numbers; // Добавляем 7 в начало
            isFirstInput = false;
        }

        // Ограничиваем длину (11 цифр: 7 + 10 цифр номера)
        numbers = numbers.substring(0, 11);

        // Форматируем номер
        let formatted = '';

        if (numbers.length > 0) {
            formatted = '+7';
        }
        if (numbers.length > 1) {
            formatted += ' (' + numbers.substring(1, 4);
        }
        if (numbers.length >= 5) {
            formatted += ') ' + numbers.substring(4, 7);
        }
        if (numbers.length >= 8) {
            formatted += '-' + numbers.substring(7, 9);
        }
        if (numbers.length >= 10) {
            formatted += '-' + numbers.substring(9, 11);
        }

        return formatted;
    }

    // Функция для получения чистого номера
    function getCleanPhoneNumber(formattedValue) {
        return formattedValue.replace(/\D/g, '');
    }

    // Обработчик ввода
    phoneInput.addEventListener('input', function(e) {
        const cursorPosition = e.target.selectionStart;
        const oldValue = e.target.value;

        // Форматируем номер
        const formattedValue = formatPhoneNumber(oldValue);
        e.target.value = formattedValue;

        // Вычисляем новую позицию курсора
        let newCursorPosition = cursorPosition;

        // Если добавляем символы, двигаем курсор вперед
        if (formattedValue.length > oldValue.length) {
            newCursorPosition += (formattedValue.length - oldValue.length);
        }
        // Если удаляем символы, корректируем позицию
        else if (formattedValue.length < oldValue.length) {
            const deletedChars = oldValue.length - formattedValue.length;
            newCursorPosition = Math.max(0, cursorPosition - deletedChars);
        }

        // Устанавливаем позицию курсора
        e.target.setSelectionRange(newCursorPosition, newCursorPosition);

        // Управляем классом для floating label
        if (getCleanPhoneNumber(e.target.value).length >= 1) {
            e.target.classList.add('auth-has-value');
        } else {
            e.target.classList.remove('auth-has-value');
        }
    });

    // Обработчик фокуса
    phoneInput.addEventListener('focus', function() {
        this.classList.add('auth-focused');
    });

    phoneInput.addEventListener('blur', function() {
        this.classList.remove('auth-focused');
        const cleanNumber = getCleanPhoneNumber(this.value);
        if (cleanNumber.length === 0) {
            this.value = '';
            this.classList.remove('auth-has-value');
            isFirstInput = true; // Сбрасываем для следующего ввода
        }
    });

    // Обработчик клавиш для правильного удаления
    phoneInput.addEventListener('keydown', function(e) {
        // Запоминаем значение перед действием
        const oldValue = this.value;
        const cursorPosition = this.selectionStart;

        // Если нажата Backspace и курсор находится в зоне +7 (
        if (e.key === 'Backspace') {
            const cleanNumber = getCleanPhoneNumber(oldValue);

            // Если пытаемся удалить символы из +7 ( и есть цифры
            if (cursorPosition <= 4 && cleanNumber.length > 0) {
                e.preventDefault();

                // Удаляем последнюю цифру из чистого номера
                const newCleanNumber = cleanNumber.substring(0, cleanNumber.length - 1);

                // Форматируем новый номер
                let newFormatted = '';
                if (newCleanNumber.length > 0) {
                    newFormatted = '+7';
                }
                if (newCleanNumber.length > 1) {
                    newFormatted += ' (' + newCleanNumber.substring(1, 4);
                }
                if (newCleanNumber.length >= 5) {
                    newFormatted += ') ' + newCleanNumber.substring(4, 7);
                }
                if (newCleanNumber.length >= 8) {
                    newFormatted += '-' + newCleanNumber.substring(7, 9);
                }
                if (newCleanNumber.length >= 10) {
                    newFormatted += '-' + newCleanNumber.substring(9, 11);
                }

                this.value = newFormatted;

                // Устанавливаем курсор в конец
                this.setSelectionRange(newFormatted.length, newFormatted.length);

                // Обновляем состояние floating label
                if (newCleanNumber.length >= 1) {
                    this.classList.add('auth-has-value');
                } else {
                    this.classList.remove('auth-has-value');
                    isFirstInput = true;
                }
            }
        }

        // Если нажата Delete и курсор в начале
        if (e.key === 'Delete' && cursorPosition <= 4) {
            e.preventDefault();
        }
    });

    // Фокус на поле при загрузке
    setTimeout(() => {
        phoneInput.focus();
    }, 100);

    // Обработка формы
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const cleanNumber = getCleanPhoneNumber(phoneInput.value);

        if (cleanNumber.length !== 11) {
            alert('Пожалуйста, введите корректный номер телефона (11 цифр)');
            phoneInput.focus();
            return;
        }

        // Здесь будет отправка на сервер
        console.log('Номер телефона:', '+' + cleanNumber);
        alert('Запрос на вход отправлен на номер: +' + cleanNumber);
    });
});