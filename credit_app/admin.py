from django.contrib import admin
from .models import CreditApplication

@admin.register(CreditApplication)
class CreditApplicationAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'credit_amount', 'credit_term', 'purpose', 'created_at']
    list_filter = ['purpose', 'created_at']
    search_fields = ['full_name', 'phone', 'email']
    readonly_fields = ['created_at']