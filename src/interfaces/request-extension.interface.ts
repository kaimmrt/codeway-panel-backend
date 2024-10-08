import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

export interface RequestExtension extends Request {
  user: DecodedIdToken;
}
