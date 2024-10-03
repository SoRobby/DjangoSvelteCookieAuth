from apps.accounts.schemas import AccountPublicResponseSchema, AccountPublicSchema
from apps.core.schemas import ErrorSchema
from ninja_jwt.authentication import JWTAuth

from .router import accounts_router


@accounts_router.get("/auth/get-current-user", auth=JWTAuth(), response={200: AccountPublicResponseSchema, 403: ErrorSchema})
def get_user_info(request):
    print("[ACCOUNTS.API.GET_CURRENT_USER] Called")
    user = request.user
    if user.is_authenticated:

        return 200, AccountPublicResponseSchema(
            success=True,
            message="Request was successful",
            account=AccountPublicSchema(
                username=user.username,
                email=user.email,
                first_name=user.first_name,
                last_name=user.last_name,
                is_superuser=user.is_superuser,
                country=user.country,
            ),
        )
    else:
        # HTTP Error 403: Server understood the request, but is unwilling to process it
        return 403, ErrorSchema(
            success=False,
            message="User is not authenticated or logged in",
        )
