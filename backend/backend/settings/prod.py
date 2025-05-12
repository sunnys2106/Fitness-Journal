from .base import *
import os
import dj_database_url


# DATABASE_URL = os.environ.get("DATABASE_URL")
# DATABASES = {"default": dj_database_url.parse(DATABASE_URL)}
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("POSTGRES_DB"),
        "USER": os.getenv("POSTGRES_USER"),
        "PASSWORD": os.getenv("POSTGRES_PASSWORD"),
        "HOST": os.getenv("POSTGRES_HOST"),
        "PORT": os.getenv("POSTGRES_PORT"),
    }
}


CORS_ALLOWED_ORIGINS = [
    "https://fitness-journal-mu.vercel.app",
    "http://fitness-journal-mu.vercel.app",
    "https://sunnyshen.app",
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split()
