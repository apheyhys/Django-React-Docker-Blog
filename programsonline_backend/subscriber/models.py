from django.db import models
import uuid


class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    verification_code = models.CharField(max_length=100, unique=True, default=uuid.uuid4, primary_key=True)
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.email} confirmed \'{self.confirmed}\''
