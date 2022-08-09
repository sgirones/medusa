/**
 * @oas [delete] /auth
 * operationId: "DeleteAuth"
 * summary: "Delete Session"
 * x-authenticated: true
 * description: "Deletes the current session for the logged in user."
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.auth.deleteSession()
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request DELETE 'https://medusa-url.com/admin/auth' \
 *       --header 'Authorization: Bearer {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 * tags:
 *   - Auth
 * responses:
 *  "200":
 *    description: OK
 */
export default async (req, res) => {
  req.session.destroy()
  res.status(200).end()
}
