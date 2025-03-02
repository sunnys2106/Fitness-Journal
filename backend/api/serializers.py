from django.contrib.auth.models import User
from .models import Exercise, Workout
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["id", "name", "weight", "sets", "reps", "notes", "author", "workout"]
        extra_kwargs = {"author": {"read_only": True}, "workout": {"read_only": True}}

    def create(self, validated_data):
        request = self.context["request"]
        workout_id = self.context["view"].kwargs.get("workout_id")
        workout = Workout.objects.get(id=workout_id, author=request.user)

        validated_data["workout"] = workout
        validated_data["author"] = request.user

        return super().create(validated_data)


class WorkoutSerializer(serializers.ModelSerializer):
    workout_exercises = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = ["id", "name", "author", "workout_exercises"]
        extra_kwargs = {"author": {"read_only": True}}

    def validate_author(self, value):
        return self.context["request"].user
