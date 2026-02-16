import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { InitiateAuthCommand } from '@aws-sdk/client-cognito-identity-provider';
// Internal app
import type { ApiPromise } from '@/interfaces';
import { userNameCookieName } from '@/constans';
import { setSessAttr, setSession } from '@/libs/redis';
import { cookieValues, encodeBase64, currenTenant } from '@/utils';
import { cognitoCredSetts, sessionSetts } from '@/tenants/tenantSettings';
import { cognitoConnect, decodeAuthResult, hashClienSecret } from '@/libs/cognito';

export async function POST(request: NextRequest): ApiPromise {
  const tenant = await currenTenant();
  const { email, password } = await request.json();
  const { clientId } = await cognitoCredSetts();
  const { secretHash } = await hashClienSecret(email);

  const { sessExpTime } = await sessionSetts(tenant);

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  });

  const { status, cognitoResp, result } = await cognitoConnect(command);

  if (result?.ChallengeName) {
    cognitoResp.code = '200.00.301';
    cognitoResp.payload = { challengeName: result.ChallengeName };
    const sessAttr = {
      session: result.Session,
      userId: result.ChallengeParameters.USER_ID_FOR_SRP,
    };

    await setSessAttr(sessAttr);
  }

  let userCookie = null;
  if (result?.AuthenticationResult) {
    const authresult = decodeAuthResult(result.AuthenticationResult);
    if (typeof authresult.cognitoUserId === 'string' && authresult.cognitoUserId) {
      const encodedUser = encodeBase64(authresult.cognitoUserId);
      userCookie = cookieValues({
        name: userNameCookieName,
        value: encodedUser,
        sameSite: 'strict',
        expires: sessExpTime,
      });
      if (!Array.isArray(cognitoResp.cookies)) cognitoResp.cookies = [];
      (cognitoResp.cookies as any[]).push(userCookie);
    }
    await setSession(authresult);
  }

  return NextResponse.json(cognitoResp, { status });
}
