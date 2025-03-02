from rest_framework import permissions


class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Check if the object’s author is the same as the logged-in user
        return obj.author == request.user
