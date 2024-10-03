from ninja import Router
from ninja_jwt.authentication import JWTAuth
from apps.core.schemas import BaseResponseSchema

core_router = Router()



@core_router.get("/sample-protected-endpoint", auth=JWTAuth())
def get_data(request, *args):

    return 200, BaseResponseSchema(
            success=True,
            message="Request was successful",
        )

