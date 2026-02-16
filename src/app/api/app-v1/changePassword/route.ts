import { NextResponse } from 'next/server';
import { ChangePasswordCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import { getSessAttr } from '@/libs/redis';
import { cognitoConnect } from '@/libs/cognito';

/**
 * HTTP POST handler to change the authenticated user's password in AWS Cognito.
 *
 * This endpoint expects the user to be logged in, and requires their current and new passwords.
 * The access token is retrieved from Redis session storage and used to authorize the password change.
 *
 * The request body is expected to be in the format:
 * ```json
 * {
 *   "payload": {
 *     "currentPassword": "OldPass123!",
 *     "newPassword": "NewPass456!"
 *   }
 * }
 * ```
 *
 * If the `payload` is missing or its properties are empty, the handler returns a 400 error.
 * On success, it returns the response from Cognito.
 *
 * @param request - A POST request with encrypted `payload` field including passwords
 * @returns A JSON response with Cognito's result or error
 */
export async function POST(request: Request) {
  const { currentPassword, newPassword } = await request.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ message: 'Missing required parameters' }, { status: 400 });
  }

  const accessToken = (await getSessAttr('accessToken')) as string;

  const command = new ChangePasswordCommand({
    PreviousPassword: currentPassword,
    ProposedPassword: newPassword,
    AccessToken: accessToken,
  });

  const { result } = await cognitoConnect(command);

  return NextResponse.json(result);
}
