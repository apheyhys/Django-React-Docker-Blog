from django.db import models


class Contact(models.Model):
    name = models.CharField(max_length=100)
    body = models.CharField(max_length=500)
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'\'{self.name}\' send message - \'{self.body}\' - at - \'{self.created_date}\''
