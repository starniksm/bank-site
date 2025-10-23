document.addEventListener('DOMContentLoaded', function() {
    initializeCalculator();
    document.getElementById('creditForm').addEventListener('submit', handleFormSubmit);
});

function initializeCalculator() {
    const amountSlider = document.getElementById('amount');
    const amountValue = document.getElementById('amountValue');
    const termSlider = document.getElementById('term');
    const termValue = document.getElementById('termValue');

    // Обновление слайдеров
    [amountSlider, termSlider].forEach(slider => {
        slider.addEventListener('input', updateCalculator);
    });

    // Синхронизация с формой
    amountSlider.addEventListener('input', function() {
        document.getElementById('credit_amount').value = this.value;
        amountValue.textContent = formatCurrency(this.value) + ' ₽';
    });

    termSlider.addEventListener('input', function() {
        document.getElementById('credit_term').value = this.value;
        termValue.textContent = this.value + ' года';
    });

    document.getElementById('credit_amount').addEventListener('input', function() {
        amountSlider.value = this.value;
        amountValue.textContent = formatCurrency(this.value) + ' ₽';
        updateCalculator();
    });

    document.getElementById('credit_term').addEventListener('change', function() {
        termSlider.value = this.value;
        termValue.textContent = this.value + ' года';
        updateCalculator();
    });

    updateCalculator();
}

function updateCalculator() {
    const amount = document.getElementById('amount').value;
    const term = document.getElementById('term').value;

    // Простой расчет (можно заменить на вызов Django view)
    const annualRate = 0.129; // 12.9%
    const monthlyRate = annualRate / 12;
    const months = term * 12;

    let monthlyPayment;
    if (monthlyRate > 0) {
        monthlyPayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    } else {
        monthlyPayment = amount / months;
    }

    const totalPayment = monthlyPayment * months;
    const overpayment = totalPayment - amount;

    document.getElementById('monthlyPayment').textContent = formatCurrency(Math.round(monthlyPayment)) + ' ₽';
    document.getElementById('totalPayment').textContent = formatCurrency(Math.round(totalPayment)) + ' ₽';
    document.getElementById('overpayment').textContent = formatCurrency(Math.round(overpayment)) + ' ₽';
}

function toggleCalculator() {
    const calculatorSection = document.getElementById('calculatorSection');
    calculatorSection.scrollIntoView({ behavior: 'smooth' });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    fetch('', {
        method: 'POST',
        body: formData,
        headers: {
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        const messageEl = document.getElementById('formMessage');
        messageEl.textContent = data.message || 'Заявка успешно отправлена!';
        messageEl.className = 'message success';
        messageEl.style.display = 'block';

        if (data.success) {
            form.reset();
        }

        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        console.error('Error:', error);
        const messageEl = document.getElementById('formMessage');
        messageEl.textContent = 'Произошла ошибка. Попробуйте еще раз.';
        messageEl.className = 'message error';
        messageEl.style.display = 'block';
    });
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('ru-RU').format(amount);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}