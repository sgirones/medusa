import jwt from "jsonwebtoken"
import { MedusaError } from "../common"

export const generateJwtToken = (
  tokenPayload: Record<string, unknown>,
  jwtConfig: {
    secret: jwt.Secret | undefined
    expiresIn: string | undefined
    options?: jwt.SignOptions
  }
) => {
  if (!jwtConfig.secret || !jwtConfig.expiresIn) {
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      "JWT secret and expiresIn must be provided when generating a token"
    )
  }

  return jwt.sign(tokenPayload, jwtConfig.secret, {
    ...(jwtConfig.options ? jwtConfig.options : {}),
    expiresIn: jwtConfig.expiresIn,
  })
}
