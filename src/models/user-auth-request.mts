import { Request } from "express"

type ProjectPayload = {
    project_name: string
}

interface UserAuthRequest extends Request {
  user: ProjectPayload // or any other type
}

export { ProjectPayload, UserAuthRequest }