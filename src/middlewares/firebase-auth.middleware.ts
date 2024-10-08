import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import { RequestExtension } from 'src/interfaces/request-extension.interface';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  use(req: RequestExtension, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.user = decodedToken;
        next();
      })
      .catch((error) => {
        console.error('Token verification failed', error);
        res.status(401).send('Unauthorized');
      });
  }
}
