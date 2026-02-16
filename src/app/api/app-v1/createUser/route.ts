import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AdminCreateUserCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import type { ApiPromise } from '@/interfaces';
import { cognitoConnect } from '@/libs/cognito';
import { cognitoCredSetts } from '@/tenants/tenantSettings';

/**
 * API Route Handler for creating new users in AWS Cognito User Pool
 *
 * This endpoint handles POST requests to create a new user account using AWS Cognito.
 * The user will receive an email invitation with temporary credentials.
 *
 * @route POST /api/app-v1/createUser
 *
 * @param request - The NextJS request object containing the user data in the request body
 * @param request.userData - User form data including email, name, and other user attributes
 * @param request.userData.email - User's email address (used as username)
 *
 * @returns A Promise that resolves to a NextResponse containing:
 * - Success: User creation response from Cognito with status 200/201
 * - Error: Error details with appropriate HTTP status code
 *
 * @throws {Error} When Cognito user creation fails
 * @throws {Error} When user pool configuration is invalid
 * @throws {Error} When request body is malformed
 *
 * @example
 * ```typescript
 * // Request body example
 * {
 *   "userData": {
 *     "email": "user@example.com",
 *     "name": "John Doe",
 *     "phone": "+1234567890"
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Successful response
 * {
 *   "User": {
 *     "Username": "user@example.com",
 *     "UserStatus": "FORCE_CHANGE_PASSWORD",
 *     "Enabled": true
 *   }
 * }
 * ```
 *
 */
export async function POST(request: NextRequest): ApiPromise {
  const userData = await request.json();
  const { roleName, ...userFields } = userData;

  const { userPollId } = await cognitoCredSetts();

  const command = new AdminCreateUserCommand({
    UserPoolId: userPollId,
    Username: userFields.email,
    DesiredDeliveryMediums: ['EMAIL'],
    UserAttributes: [
      {
        Name: 'given_name',
        Value: userFields.firstName,
      },
      {
        Name: 'middle_name',
        Value: userFields.middleName,
      },
      {
        Name: 'family_name',
        Value: userFields.surnames,
      },
      {
        Name: 'phone_number',
        Value: userFields.phone,
      },
      {
        Name: 'phone_number_verified',
        Value: 'true',
      },
      {
        Name: 'email',
        Value: userFields.email,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
      {
        Name: 'custom:role_id',
        Value: userFields.role,
      },
      {
        Name: 'custom:role',
        Value: roleName,
      },
      {
        Name: 'custom:company',
        Value: userFields.company || 'Novopayment',
      },
      {
        Name: 'custom:user_job',
        Value: userFields.userJob,
      },
      {
        Name: 'custom:user_job_area',
        Value: userFields.userJobArea,
      },
      {
        Name: 'custom:mfa',
        Value: userFields.haveTFA ? 'true' : 'false',
      },
    ],
  });

  const { status, cognitoResp } = await cognitoConnect(command);

  return NextResponse.json(cognitoResp, { status });
}
