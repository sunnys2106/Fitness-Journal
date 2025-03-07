from django.urls import path
from .views import ExerciseCreate, ExerciseUpdate, ExerciseDelete, ExerciseList
from .views import WorkoutCreate, WorkoutUpdate, WorkoutDelete, WorkoutList

urlpatterns = [
    path(
        "workouts/<int:workout_id>/exercises/",
        ExerciseList.as_view(),
        name="exercise-list",
    ),
    path(
        "workouts/<int:workout_id>/exercises/create/",
        ExerciseCreate.as_view(),
        name="exercise-create",
    ),
    path(
        "workouts/<int:workout_id>/exercises/update/<int:pk>/",
        ExerciseUpdate.as_view(),
        name="exercise-update",
    ),
    path(
        "workouts/<int:workout_id>/exercises/delete/<int:pk>/",
        ExerciseDelete.as_view(),
        name="exercise-delete",
    ),
    path("workouts/", WorkoutList.as_view(), name="workout-list"),
    path("workouts/create/", WorkoutCreate.as_view(), name="workout-create"),
    path("workouts/update/<int:pk>/", WorkoutUpdate.as_view(), name="workout-update"),
    path("workouts/delete/<int:pk>/", WorkoutDelete.as_view(), name="workout-delete"),
]
