# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt

from .models import Transaction

import json

@csrf_exempt
def index(request):
    if request.method == 'POST':
        body = json.loads(request.body)
        action = body["action"]
        key = body["key"]
        if action == 'ADD':
            val = body["val"]
            t = Transaction(action=action, key=key, value=val)
        elif action == 'REMOVE':
            t = Transaction(action=action, key=key)
        t.save()
        return HttpResponse("OK")
    else:
        template = loader.get_template('database_app/index.html')
        context = {
            'component': 'main.js',
            'props': getProps(),
        }
        return HttpResponse(template.render(context, request))

def getProps():
    props = {}
    for t in Transaction.objects.all().order_by('date'):
        if t.action == 'ADD':
            props[t.key] = t.value
        elif t.action == 'REMOVE':
            del props[t.key]
    return props