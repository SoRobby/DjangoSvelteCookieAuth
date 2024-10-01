# from apps.core.schemas import ErrorSchema
import logging

from apps.core.schemas import BaseResponseSchema, Error400Schema, ErrorSchema
from ninja import Schema

from .router import core_router


class Data(Schema):
    content: str


@core_router.get("/hello-world", response={200: BaseResponseSchema})
def hello_get(request):
    logging.debug("[CORE.API.HELLO_GET] Called")

    return 200, BaseResponseSchema(
        success=True,
        message="Request was successful",
        chicken="Chicken was crossing the road...",  # type: ignore
        turkey={"turkey": "Turkey was crossing the road..."},  # type: ignore
    )


@core_router.post("/hello-world-post", response={200: BaseResponseSchema, 204: BaseResponseSchema, 403: ErrorSchema})
def hello_post(request, data: Data):
    logging.debug("[CORE.API.HELLO_POST] Called")
    logging.debug(f"[CORE.API.HELLO_POST] Data: {data}")

    if data.content == "200-success-single-country":
        logging.debug("[CORE.API.HELLO_POST] 200 success")
        country_data = {
            "name": "United States",
            "code": "US",
        }

        return 200, BaseResponseSchema(
            success=True, message="Request was successful", country=country_data  # type: ignore
        )

    elif data.content == "200-success-list-countries":
        logging.debug("[CORE.API.HELLO_POST] 200 success")

        country_data = [
            {"name": "United States", "code": "US"},
            {"name": "Canada", "code": "CA"},
            {"name": "Mexico", "code": "MX"},
        ]

        return 200, BaseResponseSchema(
            success=True,
            message="Post request successful",
            countries=country_data,  # type: ignore
        )

    elif data.content == "204success":
        # 204 No content response
        logging.debug("[CORE.API.HELLO_POST] 204 success")
        return 204, None

    elif data.content == "400-bad-request":
        # HTTP Error 400: The server cannot or will not process the request due to an apparent client error
        logging.debug("[CORE.API.HELLO_POST] 400 error")
        return 400, ErrorSchema(
            success=False,
            message="The server cannot or will not process the request due to an apparent client error",
        )

    elif data.content == "403error":
        logging.debug("[CORE.API.HELLO_POST] 403 error")
        return 403, ErrorSchema(
            success=False,
            message="Unable to process request!",
            errors=[
                Error400Schema(field="content1", message="The content1 field is invalid"),
                Error400Schema(field="content2", message="The content2 field is invalid"),
            ],
        )

    elif data.content == "500error":
        # This will purposely cause a server error
        logging.debug("[CORE.API.HELLO_POST] 500 error")
        a = 1 / 0

    else:
        logging.debug("[CORE.API.HELLO_POST] Default response")
        return 200, BaseResponseSchema(
            success=True,
            message="Post request successful",
        )
