import { AuthIdentityDTO } from "@medusajs/framework/types"
import { generateJwtToken } from "@medusajs/framework/utils"
import type jwt from "jsonwebtoken"

export function generateJwtTokenForAuthIdentity(
  {
    authIdentity,
    actorType,
  }: { authIdentity: AuthIdentityDTO; actorType: string },
  jwtConfig: {
    secret: jwt.Secret | undefined
    expiresIn: string | undefined
    options?: jwt.SignOptions
  }
) {
  const entityIdKey = `${actorType}_id`
  const entityId = authIdentity?.app_metadata?.[entityIdKey] as
    | string
    | undefined

  return generateJwtToken(
    {
      actor_id: entityId ?? "",
      actor_type: actorType,
      auth_identity_id: authIdentity?.id ?? "",
      app_metadata: {
        [entityIdKey]: entityId,
      },
    },
    jwtConfig
  )
}
