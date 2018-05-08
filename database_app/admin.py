# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Transaction

class TransactionAdmin(admin.ModelAdmin):
	list_display = ['date', 'action', 'key', 'value']
	list_filter = ['date', 'action']
	search_fields = ['key', 'value']

# Register your models here.
admin.site.register(Transaction, TransactionAdmin)