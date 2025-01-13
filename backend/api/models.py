from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

# class Note(models.Model):
#     title = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

#     def __str__(self):
#         return self.title


class Exercise(models.Model):
    name = models.CharField(max_length=100)
    weight = models.IntegerField(validators=[MinValueValidator(0)])
    sets = models.IntegerField(
        default=0, validators=[MaxValueValidator(100), MinValueValidator(1)]
    )
    reps = models.IntegerField(
        validators=[MaxValueValidator(100), MinValueValidator(1)]
    )
    notes = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="exercises")

    def __str__(self):
        return self.name
