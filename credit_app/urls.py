from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('loans/', views.loans_main, name='loans_main'),
    path('loans/cash/', views.credit_cash, name='credit_cash'),
    path('loans/auto/', views.credit_auto, name='credit_auto'),
    path('loans/refinance/', views.credit_refinance, name='credit_refinance'),
    path('loans/real-estate/', views.credit_real_estate, name='credit_real_estate'),
    path('loans/education/', views.credit_education, name='credit_education'),
    path('calculate/', views.calculate_credit, name='calculate_credit'),
]