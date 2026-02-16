import { NextResponse } from 'next/server';
import { GetUserCommand } from '@aws-sdk/client-cognito-identity-provider';

// Internal app
import { cognitoConnect } from '@/libs/cognito';
import { getSessAttr, setSessAttr } from '@/libs/redis';
import { ApiPromise, DataServerProps } from '@/interfaces';

function toCamelCase(str: string): string {
  return str.replace(/_(.)/g, (_, char) => char.toUpperCase()).replace(/^custom:/, '');
}

const delAttr = ['sub'];

/**
 * Gets the current authenticated user information from AWS Cognito and JWT session data
 *
 * This endpoint retrieves comprehensive user details by combining:
 * 1. User attributes from AWS Cognito UserAttributes (email, names, phone, etc.)
 * 2. JWT session data stored in Redis (customerId, email from login)
 *
 * The response includes processed user attributes with proper camelCase formatting,
 * display names, initials, and the customerId extracted from the JWT during login.
 *
 * Uses the cognitoConnect function to handle AWS Cognito communication and error management.
 * Error handling is delegated to the client-side Tanstack Query implementation.
 *
 * @returns {Promise<NextResponse>} JSON response containing:
 *   - On success: Comprehensive user information object with:
 *     - email: User's email address
 *     - customerId: Customer ID extracted from JWT custom claims
 *     - givenName: User's first name (if available)
 *     - familyName: User's last name (if available)
 *     - displayName: Formatted display name (email or "firstName lastName")
 *     - initials: User's initials (if first and last names available)
 *     - phoneNumber: User's phone number (if available)
 *     - isIdle: Always set to true for session management
 *     - Other Cognito UserAttributes in camelCase format
 *   - On error: Error response with cognitoResp containing error code and message
 *
 * @throws {Error} When access token is invalid or Cognito service is unavailable
 *
 * @example
 * ```json
 * {
 *   "payload": {
 *     "email": "user@example.com",
 *     "customerId": "5f1518ba-06a0-4a84-a9a9-d38956e28176",
 *     "givenName": "John",
 *     "familyName": "Doe",
 *     "displayName": "John Doe",
 *     "initials": "JD",
 *     "phoneNumber": "+1234567890",
 *     "isIdle": true
 *   }
 * }
 * ```
 */
export async function GET(): ApiPromise {
  const accessToken = (await getSessAttr('accessToken')) as string;
  const sessionUserAttr = (await getSessAttr('userAttr')) as string;

  const command = new GetUserCommand({
    AccessToken: accessToken,
  });

  const { status, cognitoResp, result } = await cognitoConnect(command);

  if (result) {
    let userAttr: DataServerProps['userAttr'] = {};

    if (result.UserAttributes) {
      const userAttributes = result.UserAttributes.map((element: { Name: string; Value: unknown }) => {
        const name = toCamelCase(element.Name);
        return { [name]: element.Value };
      });

      userAttr = Object.assign(userAttr, ...userAttributes);
    }

    // Merge with JWT session data (includes email and customerId from login)
    if (sessionUserAttr) {
      const sessionData = JSON.parse(sessionUserAttr);
      userAttr = { ...userAttr, ...sessionData };
    }

    userAttr.isIdle = true;
    userAttr.displayName = userAttr.email;
    userAttr.initials = '';

    delAttr.forEach((attr) => delete userAttr[attr]);

    if (userAttr.givenName || userAttr.familyName) {
      const givenName = userAttr.givenName as string;
      const familyName = userAttr.familyName as string;
      userAttr.displayName = `${userAttr.givenName} ${userAttr.familyName}`;
      userAttr.initials = `${givenName[0]}${familyName[0]}`;
    }

    await setSessAttr({ userAttr: JSON.stringify(userAttr) });

    cognitoResp.payload = userAttr;
  }

  return NextResponse.json(cognitoResp, { status });
}
