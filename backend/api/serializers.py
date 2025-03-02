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
        extra_kwargs = {"author": {"read_only": True}}

    def validate_workout(self, value):
        if value.author != self.context["request"].user:
            raise serializers.ValidationError(
                "You can only add exercises to your own workouts."
            )
        return value

    def create(self, validated_data):
        validated_data["author"] = self.context["request"].user
        return super().create(validated_data)


class WorkoutSerializer(serializers.ModelSerializer):
    workout_exercises = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = ["id", "name", "author", "workout_exercises"]
        extra_kwargs = {"author": {"read_only": True}}

    def validate_author(self, value):
        return self.context["request"].user
