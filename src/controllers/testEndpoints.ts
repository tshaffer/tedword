import * as fs from 'fs';

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

export function loadPuzzle(request: Request, response: Response, next: any) {
  console.log('loadPuzzle');

  console.log('request.query:');
  console.log(request.query);

  const puzzlePath: string = request.query.puzzlePath as string;

  // const { puzzlePath } = request.body;
  fs.readFile(puzzlePath, (err, data: Buffer) => {
    if (err) throw err;
    console.log(data);

    // data: Buffer(2561)

    // checksum: data.slice(0, 2)

    // magic: data.slice(2, 14).toString()
  });

  response.sendStatus(200);
}

