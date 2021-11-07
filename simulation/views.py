from django.db import models
from django.shortcuts import render
from django.views.generic import TemplateView, ListView
from .models import Pattern 
# Create your views here.

class IndexView(ListView):
    template_name = "simulation/index.html"
    model = Pattern
    