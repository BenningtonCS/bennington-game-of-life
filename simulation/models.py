from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Pattern(models.Model):
    name = models.CharField(max_length=150)
    pattern = JSONField(max_length=500)
    

