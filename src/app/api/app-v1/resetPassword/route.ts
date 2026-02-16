import { NextResponse } from 'next/server';
import { cognitoCredSetts } from '@/tenants/tenantSettings';
import { cognitoConnect, hashClienSecret } from '@/libs/cognito';
import { ConfirmForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

/**
 * HTTP POST handler to confirm a password reset in AWS Cognito.
 *
 * This endpoint expects a JSON body containing the `email`, a confirmation code
 * received via email or SMS, and the new password to assign. It calculates the `SECRET_HASH`
 * using the Cognito client credentials, and sends a `ConfirmForgotPasswordCommand`
 * to complete the password reset process for the user.
 *
 * @param request - The incoming HTTP request object, expected to have a JSON body:
 *   {
 *     email: string;
 *     confirmationCode: string;
 *     newPassword: string;
 *   }
 *
 * @returns A JSON response indicating success or failure of the operation.
 *
 * @throws Will return a formatted error response via `errorHandler` if the command fails.
 *
 * @example
 * // Request body
 * {
 *   "email": "user@example.com",
 *   "confirmationCode": "123456",
 *   "newPassword": "MyNewSecurePassword123!"
 * }
 */

export async function POST(request: Request) {
  const { email, confirmationCode, newPassword } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const { secretHash } = await hashClienSecret(email);

  const command = new ConfirmForgotPasswordCommand({
    ClientId: clientId,
    SecretHash: secretHash,
    Username: email,
    ConfirmationCode: confirmationCode,
    Password: newPassword,
  });

  const { result } = await cognitoConnect(command);

  return NextResponse.json(result);
}
