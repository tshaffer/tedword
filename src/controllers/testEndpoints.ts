import * as fs from 'fs';
// import * as multer from 'multer'
var multer  = require('multer')

import { v4 as uuidv4 } from 'uuid';

import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { PuzzleEntity, UserEntity } from '../types/entities';
import { createPuzzle, createUserDocument } from './dbInterface';
import { PuzzleSpec } from '../types';

const PuzCrossword = require('@confuzzle/puz-crossword').PuzCrossword;

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
  // TEDTODO - send response on reject
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

  fs.readFile(puzzlePath, (err, puzData: Buffer) => {
    if (err) throw err;
    console.log(puzData);

    const pc: PuzzleSpec = PuzCrossword.from(puzData);
    console.log(pc);

    const { title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = pc;

    const puzzleEntity: PuzzleEntity = {
      id: uuidv4(),
      title,
      author,
      copyright,
      note,
      width,
      height,
      clues,
      solution,
      state,
      hasState,
      parsedClues,
    };

    // TEDTODO - send response on reject
    createPuzzle(puzzleEntity)
      .then((puzzleDoc) => {
        const puzzleDocument = puzzleDoc as Document;
        console.log('added userDocument');
        console.log(puzzleDocument);
        console.log(puzzleDocument.toObject());

        response.status(201).json({
          success: true,
          data: puzzleDocument,
        });
      });
  });
}

// const UPLOAD_PATH = 'uploads';
// const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration

// export function uploadPuzzle(req: Request, res: Response, next: any) {
//   console.log('uploadPuzzle, request is:');
//   console.log(req);

//   let upload = multer({ storage: Storage }).single('profile_pic');

//     upload(req, res, function(err: any) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any

//         console.log(req);
//         // if (req.fileValidationError) {
//         //     return res.send(req.fileValidationError);
//         // }
//         // else if (!req.file) {
//         //     return res.send('Please select an image to upload');
//         // }
//         // else if (err instanceof multer.MulterError) {
//         //     return res.send(err);
//         // }
//         // else if (err) {
//         //     return res.send(err);
//         // }

//         // Display uploaded image for user validation
//         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
//     });
// }
