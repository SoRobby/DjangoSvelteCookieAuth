"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 5.0.4.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

import os
from pathlib import Path

import environ

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load and read the environment variables from the .env file
env = environ.Env()
env.read_env(os.path.join(BASE_DIR, ".env"))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY", default="django-insecure-12345")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DEBUG", default=True)

# Set this value to True to have URLs generated with https instead of http
# SECURITY WARNING: set to True in production
USE_HTTPS_IN_ABSOLUTE_URLS = env.bool("USE_HTTPS_IN_ABSOLUTE_URLS", default=False)

# The fully qualified domain name associated with the website
SITE_ID = 1

# Allowed hosts for security (e.g., env: ALLOWED_HOSTS=)
# https://tech.serhatteker.com/post/2021-10/django-environ-list/
ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["127.0.0.1", "localhost"])

# Django apps
DJANGO_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
]

# Third party apps
THIRD_PARTY_APPS = [
    "corsheaders",
]

# Project apps
PROJECT_APPS = [
    "apps.accounts",
    "apps.core",
]

# Installed apps
INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + PROJECT_APPS

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

ENVIRONMENT = env.str("ENVIRONMENT", default="DEVELOPMENT_LOCAL")

if ENVIRONMENT == "DEVELOPMENT_LOCAL":
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
elif ENVIRONMENT == "DEVELOPMENT_SERVER":
    if env.str("DATABASE_NAME", default=None) is None:
        raise Exception("DATABASE_NAME environment variable is not defined.")
    if env.str("DATABASE_USER", default=None) is None:
        raise Exception("DATABASE_USER environment variable is not defined.")
    if env.str("DATABASE_PASSWORD", default=None) is None:
        raise Exception("DATABASE_PASSWORD environment variable is not defined.")
    if env.str("DATABASE_HOST", default=None) is None:
        raise Exception("DATABASE_HOST environment variable is not defined.")
    if env.str("DATABASE_PORT", default=None) is None:
        raise Exception("DATABASE_PORT environment variable is not defined.")

    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env.str("DATABASE_NAME"),  # Name of your database
            "USER": env.str("DATABASE_USER"),  # Database user
            "PASSWORD": env.str("DATABASE_PASSWORD"),  # Password for the database user
            "HOST": env.str("DATABASE_HOST", default="localhost"),  # Host (default: localhost)
            "PORT": env.str("DATABASE_PORT", default="5432"),  # Port (default: 5432)
            "CONN_MAX_AGE": env.int("DATABASE_CONN_MAX_AGE", default=600),  # Maximum connection age (in seconds)
        }
    }


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

# Authentication model
AUTH_USER_MODEL = "accounts.Account"

AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.AllowAllUsersModelBackend",
    "apps.accounts.backends.CaseInsensitiveModelBackend",
)

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_ROOT = BASE_DIR / "staticfiles"

STATIC_URL = "static/"

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Media files (Images, Videos, etc...)
# https://docs.djangoproject.com/en/5.0/topics/files/

MEDIA_ROOT = BASE_DIR / "media"

MEDIA_URL = "media/"

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Session cookie age in seconds. Can be used to avoid log sessions (# days x 24 hrs x 60 min x 60 sec)
# The current value is 7 days until the cookies expire
# Ref: https://docs.djangoproject.com/en/4.1/topics/http/sessions/
SESSION_COOKIE_AGE = 7 * 24 * 60 * 60

# Email configuration
# https://docs.djangoproject.com/en/5.0/ref/settings/
# https://docs.djangoproject.com/en/5.0/topics/email/#email-backends

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

EMAIL_HOST = "localhost"

EMAIL_PORT = "1025"

EMAIL_HOST_USER = ""

EMAIL_HOST_PASSWORD = ""

EMAIL_USE_TLS = False

EMAIL_USE_SSL = False


# CSRF settings
CSRF_COOKIE_SECURE = True

CSRF_COOKIE_SAMESITE = "None"

CSRF_COOKIE_HTTPONLY = False

CSRF_COOKIE_DOMAIN = ".ondigitalocean.app"
# CSRF_COOKIE_DOMAIN = "example-backend-8lntg.ondigitalocean.app"

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "https://example-frontend-gbldq.ondigitalocean.app",
    "https://example-backend-8lntg.ondigitalocean.app",
]


# CORS settings
# https://pypi.org/project/django-cors-headers/
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "https://example-frontend-gbldq.ondigitalocean.app"
]

CORS_ALLOW_HEADERS = [
    "X-CSRFToken",
    "Content-Type",
]


# Session cookie settings
SESSION_COOKIE_SAMESITE = "None"

SESSION_COOKIE_SECURE = True

SESSION_COOKIE_DOMAIN = ".ondigitalocean.app"
# SESSION_COOKIE_DOMAIN = "example-backend-8lntg.ondigitalocean.app"


# Logging configuration
LOG_LEVEL = env("LOG_LEVEL", default="DEBUG")

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "filters": {
        "colorize": {"()": "config.configurator.ColorizeFilter"},
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "custom",
            "filters": ["colorize"],
        },
    },
    "formatters": {
        "custom": {"format": "[{asctime}] {levelname} | {message}", "style": "{", "datefmt": "%d/%b/%Y %H:%M:%S"},
    },
    "root": {
        "handlers": ["console"],
        "level": LOG_LEVEL,
    },
}
