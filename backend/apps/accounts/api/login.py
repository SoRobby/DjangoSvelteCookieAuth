import logging

from apps.accounts.api.router import accounts_router
from apps.accounts.schemas import LoginRequestSchema, LoginResponseSchema
from apps.core.schemas import ErrorSchema
from django.contrib.auth import authenticate, login


# Login
@accounts_router.post("/auth/login", response={200: LoginResponseSchema, 401: ErrorSchema})
def login_view(request, data: LoginRequestSchema):
    logging.debug("[ACCOUNTS.API.LOGIN_VIEW] Called")

    #  Authenticate the user, if user cannot be authenticated, return a 401 status code
    user = authenticate(email=data.email, password=data.password)

    if user:
        logging.debug("[ACCOUNTS.API.LOGIN_VIEW] User credentials authenticated")
        login(request, user)
        logging.debug("[ACCOUNTS.API.LOGIN_VIEW] User logged in")

        # Change BaseResponseSchema to the schema you want to use for the response
        return 200, LoginResponseSchema(
            success=True,
            message="Request was successful",
            username=user.username,
            email=user.email,
            is_superuser=user.is_superuser,
            first_name=user.first_name,
            last_name=user.last_name,
            sessionid=request.session.session_key,
        )

    else:
        logging.debug("[ACCOUNTS.API.LOGIN_VIEW] User credentials not authenticated, returning 401")
        return 401, ErrorSchema(
            success=False,
            message="Unable to login, the email and/or password is incorrect",
        )
