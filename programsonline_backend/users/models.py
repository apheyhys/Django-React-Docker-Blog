from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    photo = models.CharField(max_length=350, blank=True)

    def __str__(self):
        return self.username
