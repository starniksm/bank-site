from django.db import models


class CreditApplication(models.Model):
    full_name = models.CharField(max_length=100, verbose_name="ФИО")
    phone = models.CharField(max_length=20, verbose_name="Телефон")
    email = models.EmailField(verbose_name="Email")
    credit_amount = models.DecimalField(max_digits=12, decimal_places=2, verbose_name="Сумма кредита")
    credit_term = models.IntegerField(verbose_name="Срок кредита (лет)")
    purpose = models.CharField(max_length=200, verbose_name="Цель кредита")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")

    class Meta:
        verbose_name = "Заявка на кредит"
        verbose_name_plural = "Заявки на кредит"

    def __str__(self):
        return f"{self.full_name} - {self.credit_amount} ₽"