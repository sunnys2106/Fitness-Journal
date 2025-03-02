from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Exercise


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
        fields = ["id", "name", "weight", "sets", "reps", "notes", "author"]
        extra_kwargs = {"author": {"read_only": True}}
