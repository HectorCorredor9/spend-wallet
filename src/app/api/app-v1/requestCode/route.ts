import { NextResponse } from 'next/server';
import { cognitoCredSetts } from '@/tenants/tenantSettings';
import { cognitoConnect, hashClienSecret } from '@/libs/cognito';
import { ForgotPasswordCommand } from '@aws-sdk/client-cognito-identity-provider';

/**
 * Handles POST requests to initiate a forgot password process.
 *
 * This endpoint triggers the forgot password flow in AWS Cognito by sending
 * a verification code to the user's email address. The user can then use this
 * code to reset their password.
 *
 * @param request - The incoming HTTP request containing the user's email
 * @returns A JSON response with the result of the forgot password operation
 *
 * @throws Will return an error response if:
 * - The email is not provided in the request body
 * - The user is not found in Cognito
 * - AWS Cognito service is unavailable
 * - Invalid tenant configuration
 *
 * @example
 * ```typescript
 * // Request body
 * {
 *   "email": "user@example.com"
 * }
 *
 * // Response
 * {
 *   "CodeDeliveryDetails": {
 *     "Destination": "u***@example.com",
 *     "DeliveryMedium": "EMAIL",
 *     "AttributeName": "email"
 *   }
 * }
 * ```
 */
export async function POST(request: Request) {
  const { email } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const { secretHash } = await hashClienSecret(email);

  const command = new ForgotPasswordCommand({
    ClientId: clientId,
    SecretHash: secretHash,
    Username: email,
  });

  const { result } = await cognitoConnect(command);

  return NextResponse.json(result);
}
