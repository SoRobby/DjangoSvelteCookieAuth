from typing import List, Optional

from apps.accounts.models import Account
from apps.core.schemas import BaseResponseSchema, CountryBasicSchema
from ninja import ModelSchema


# Model schemas
class AccountPrivateSchema(ModelSchema):
    country: Optional[CountryBasicSchema] = None

    class Meta:
        model = Account
        exclude = [
            "id",
            "password",
        ]


class AccountPublicSchema(ModelSchema):
    country: Optional[CountryBasicSchema] = None

    class Meta:
        model = Account
        fields = ["username", "email", "first_name", "last_name", "is_superuser", "country"]


class AccountPublicResponseSchema(BaseResponseSchema):
    account: AccountPublicSchema


class EditAccountResponseSchema(BaseResponseSchema):
    account: AccountPrivateSchema
