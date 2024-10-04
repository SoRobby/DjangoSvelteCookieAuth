"""
Project API route app configuration.
"""

import json
import logging

from apps.accounts.api.router import accounts_router
from apps.core.api.router import core_router
from django.http import HttpResponse
from ninja import NinjaAPI
from ninja.errors import ValidationError
from ninja_extra import NinjaExtraAPI
from ninja_jwt.controller import NinjaJWTDefaultController

# Define Django Ninja API (old, used csrf)
# api = NinjaAPI(version="1.0.0", csrf=True, title="DjangoNextAPI")

# Setup for Django Ninja w/ JWT
api = NinjaExtraAPI(version="1.0.0", csrf=False, title="DjangoNextAPI")
api.register_controllers(NinjaJWTDefaultController)


# Custom error handler for Ninja API
@api.exception_handler(ValidationError)
def validation_errors(request, exc: ValidationError):
    logging.error(f"Validation error: {exc.errors}")

    # Extract all error messages by concatenating them
    error_messages = "; ".join([error.get("msg", "Unknown validation error") for error in exc.errors])
    error_messages = error_messages.capitalize()

    # Structure the response in a clean and consistent way
    response_data = {
        "success": False,
        "message": error_messages,
        "detail": exc.errors,
    }

    return HttpResponse(
        json.dumps(response_data, ensure_ascii=False, indent=2),
        status=400,
        content_type="application/json",
    )


# Create Ninja API routes
# Add routes to the main API instance, root is ./api/
api.add_router("/v1/", accounts_router, tags=["Accounts"])
api.add_router("/v1/", core_router, tags=["Core"])
