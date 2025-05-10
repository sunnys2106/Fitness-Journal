from .base import *
import os
import dj_database_url


# DATABASE_URL = os.environ.get("DATABASE_URL")
# DATABASES = {"default": dj_database_url.parse(DATABASE_URL)}

CORS_ALLOWED_ORIGINS = [
    "https://fitness-journal-mu.vercel.app",
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.environ.get("DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "").split()
