import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { RequestExtension } from 'src/models/interfaces/request-extension.interface';

@Injectable()
export class FirebaseAuthMiddleware implements NestMiddleware {
  constructor(private readonly firebaseService: FirebaseService) {}

  use(req: RequestExtension, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    this.firebaseService
      .getAuth()
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
