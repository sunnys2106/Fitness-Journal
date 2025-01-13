from django.urls import path
from . import views

urlpatterns = [
    path("exercises/", views.ExerciseListCreate.as_view(), name="exercise-list"),
    path(
        "exercise/delete/<int:pk>/",
        views.ExerciseDelete.as_view(),
        name="delete-exercise",
    ),
    path(
        "exercise/update/<int:pk>/",
        views.ExerciseUpdate.as_view(),
        name="update-exercise",
    ),
]
