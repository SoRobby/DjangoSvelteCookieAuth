from apps.accounts.models import Account
from apps.core.schemas import BaseResponseSchema
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from ninja import ModelSchema, Schema
from pydantic import BaseModel, EmailStr, constr


class RegisterRequestSchema(BaseModel):
    # TODO - After testing is complete add SecretStr to password1 and password2
    username: constr(min_length=4, max_length=16)  # type: ignore
    email: EmailStr
    password1: str
    password2: str
    first_name: constr(max_length=120)  # type: ignore
    last_name: constr(max_length=120)  # type: ignore


class RegisterResponseSchema(BaseResponseSchema):
    username: str
    email: str
    is_superuser: bool
    first_name: str
    last_name: str
    sessionid: str
