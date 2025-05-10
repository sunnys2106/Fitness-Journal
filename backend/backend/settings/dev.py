from .base import *
import os
from pathlib import Path

DEBUG = True

ALLOWED_HOSTS = []

# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }


# CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # vite frontend in dev
]

SECRET_KEY = "insecure-secret-key-for-dev-only"
