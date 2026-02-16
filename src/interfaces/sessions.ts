/**
 * Session data interface.
 * @typeParam sessionId: string;
 * @typeParam tenant: string;
 * @typeParam sessExpTime: string;
 * @typeParam createdAt: string;
 * @typeParam [key: string]: any;
 */
export interface SessionData {
  sessionId: string;
  tenant: string;
  sessExpTime: string;
  createdAt: string;
  [key: string]: any;
}
