from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, ExerciseSerializer, WorkoutSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Exercise, Workout
from .permissions import IsOwner


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ExerciseCreate(generics.CreateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ExerciseUpdate(generics.UpdateAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Exercise.objects.filter(author=self.request.user)


class ExerciseDelete(generics.DestroyAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Exercise.objects.filter(author=self.request.user)


class ExerciseList(generics.ListAPIView):
    serializer_class = ExerciseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Exercise.objects.filter(author=self.request.user)


class WorkoutCreate(generics.CreateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class WorkoutUpdate(generics.UpdateAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Workout.objects.filter(author=self.request.user)


class WorkoutDelete(generics.DestroyAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        return Workout.objects.filter(author=self.request.user)


class WorkoutList(generics.ListAPIView):
    serializer_class = WorkoutSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Workout.objects.filter(author=self.request.user)
