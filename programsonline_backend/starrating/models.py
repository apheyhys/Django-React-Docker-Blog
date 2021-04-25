from django.db import models
from users.models import User
from article.models import Article
from django.core.validators import MinValueValidator, MaxValueValidator


class StarRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Article, on_delete=models.CASCADE)
    rating = models.FloatField(validators=[MinValueValidator(0.5), MaxValueValidator(5)])

    def __str__(self):
        return f' \'{self.user}\' in post \'{self.post}\' put rating - \'{self.rating}\''

