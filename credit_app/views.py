from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse

from .models import CreditApplication


def index(request):
    """Главная страница"""
    return render(request, 'credit_app/index.html')


def loans_main(request):
    """Основная страница кредитов"""
    context = {
        'show_breadcrumbs': True,
        'breadcrumbs': [
            {'name': 'Кредиты', 'url': ''}  # Текущая страница
        ]
    }
    return render(request, 'credit_app/loans_main.html', context)


def credit_cash(request):
    """Кредит наличными"""
    context = {
        'show_breadcrumbs': True,
        'breadcrumbs': [
            {'name': 'Кредиты', 'url': reverse('loans_main')},
            {'name': 'Кредит наличными', 'url': ''}
        ]
    }

    if request.method == 'POST':
        return handle_credit_application(request, 'Наличные')

    return render(request, 'credit_app/credit_cash.html', context)


def credit_auto(request):
    """Автокредит"""
    context = {
        'show_breadcrumbs': True,
        'breadcrumbs': [
            {'name': 'Кредиты', 'url': reverse('loans_main')},
            {'name': 'Автокредит', 'url': ''}
        ]
    }

    if request.method == 'POST':
        return handle_credit_application(request, 'Авто')

    return render(request, 'credit_app/credit_auto.html', context)


def credit_refinance(request):
    """Рефинансирование"""
    if request.method == 'POST':
        return handle_credit_application(request, 'Рефинансирование')
    return render(request, 'credit_app/credit_refinance.html')


def credit_real_estate(request):
    """Кредит на недвижимость"""
    if request.method == 'POST':
        return handle_credit_application(request, 'Недвижимость')
    return render(request, 'credit_app/credit_real_estate.html')


def credit_education(request):
    """Образовательный кредит"""
    if request.method == 'POST':
        return handle_credit_application(request, 'Образование')
    return render(request, 'credit_app/credit_education.html')


def handle_credit_application(request, purpose):
    """Обработка заявки на кредит"""
    if request.method == 'POST':
        full_name = request.POST.get('full_name')
        phone = request.POST.get('phone')
        email = request.POST.get('email')
        credit_amount = request.POST.get('credit_amount')
        credit_term = request.POST.get('credit_term')

        application = CreditApplication(
            full_name=full_name,
            phone=phone,
            email=email,
            credit_amount=credit_amount,
            credit_term=credit_term,
            purpose=purpose
        )
        application.save()

        return JsonResponse({'success': True, 'message': 'Заявка успешно отправлена!'})

    return JsonResponse({'success': False, 'message': 'Ошибка отправки заявки'})


def calculate_credit(request):
    """Расчет кредита"""
    if request.method == 'POST':
        amount = float(request.POST.get('amount', 0))
        term = int(request.POST.get('term', 1))

        # Простой расчет ежемесячного платежа
        annual_rate = 0.129  # 12.9%
        monthly_rate = annual_rate / 12
        months = term * 12

        if monthly_rate > 0:
            monthly_payment = amount * (monthly_rate * (1 + monthly_rate) ** months) / (
                        (1 + monthly_rate) ** months - 1)
        else:
            monthly_payment = amount / months

        total_payment = monthly_payment * months
        overpayment = total_payment - amount

        return JsonResponse({
            'monthly_payment': round(monthly_payment, 2),
            'total_payment': round(total_payment, 2),
            'overpayment': round(overpayment, 2)
        })

    return JsonResponse({'error': 'Invalid request'})

def auth_page(request):
    """Страница авторизации"""
    return render(request, 'credit_app/auth.html')