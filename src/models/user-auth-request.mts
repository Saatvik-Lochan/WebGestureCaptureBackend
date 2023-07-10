import { Request } from "express"
import { JwtPayload } from "jsonwebtoken"

type ProjectPayload = {
    project_id: string,
    name: string
}

interface UserAuthRequest extends Request {
  user: ProjectPayload // or any other type
}

export { ProjectPayload, UserAuthRequest }