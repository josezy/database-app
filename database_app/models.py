# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Transaction(models.Model):
	date = models.DateTimeField(auto_now_add=True)
	action = models.CharField(max_length=40)
	key = models.CharField(max_length=40)
	value = models.CharField(max_length=40)

	def __str__(self):
		return self.action

#  Ramdom comment on feature_branch