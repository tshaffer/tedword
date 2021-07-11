import { Request, Response } from 'express';
import { Document } from 'mongoose';


import { UserEntity } from '../types/entities';
import { createUserDocument } from './dbInterface';

export function createUser(request: Request, response: Response, next: any) {
  console.log('createUser');
  console.log(request.body);
  const { userName, password, email, cellTextColorPartnerBoard } = request.body;
  const userEntity: UserEntity = {
    userName,
    password,
    email,
    cellTextColorPartnerBoard,
  };
  createUserDocument(userEntity)
    .then((userDoc) => {
      const userDocument = userDoc as Document;
      console.log('added userDocument');
      console.log(userDocument);
      console.log(userDocument.toObject());

      response.status(201).json({
        success: true,
        data: userDocument,
      });
    });
}

