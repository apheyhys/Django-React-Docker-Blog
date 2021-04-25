from django.db import models
from users.models import User
from article.models import Comment


class Like(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} likes \'{self.comment.body[:10]}\''


class Dislike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.first_name} dislikes \'{self.comment.body[:10]}\''
