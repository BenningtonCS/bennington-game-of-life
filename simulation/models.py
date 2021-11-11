from django.db import models
from django.contrib.postgres.fields import JSONField

# Create your models here.
class Pattern(models.Model):
    name = models.CharField(max_length=150)
    pattern = models.TextField(max_length=1000)
    
    def save(self, *args, **kwargs):
        super(Pattern, self).save(*args, **kwargs)

    class Meta:
        unique_together = ('name', 'pattern',)    
        verbose_name_plural = "Patterns"     

    def __str__(self):                           
        return self.name
