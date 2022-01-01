import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { isArray } from 'lodash';
import Puzzle from '../models/Puzzle';
import { PuzzleEntity, PuzzleMetadata, PuzzleSpec } from '../types';
import { createPuzzle } from './dbInterface';

const PuzCrossword = require('@confuzzle/puz-crossword').PuzCrossword;

export const getAllPuzzlesMetadata = (request: Request, response: Response, next: any) => {
  // console.log('getAllPuzzlesMetadata');

  getAllPuzzlesMetadataFromDb()
    .then((puzzlesMetadata: PuzzleMetadata[]) => {
      // console.log('puzzlesMetadata');
      // console.log(puzzlesMetadata);
      response.json(puzzlesMetadata);
    })
};

export const getPuzzleMetadata = (request: Request, response: Response, next: any) => {

  // console.log('getPuzzleMetadata');

  // console.log('request.query:');
  // console.log(request.query);

  const id: string = request.query.id as string;

  getPuzzleMetadataFromDb(id)
    .then((puzzleMetadata: PuzzleMetadata) => {
      // console.log('puzzleMetadata');
      // console.log(puzzleMetadata);
      response.json(puzzleMetadata);
    })
};

const getPuzzleMetadataFromDb = (puzzleId: string): Promise<PuzzleMetadata> => {
  const query = Puzzle.find({ id: puzzleId });
  query.select(['id', 'title', 'author', 'sourceFileName']);
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length === 1) {
        const puzzleDocData: any = puzzleDocs[0].toObject();
        const puzzleMetadata: PuzzleMetadata = {
          id: puzzleDocData.id,
          sourceFileName: puzzleDocData.sourceFileName,
          author: puzzleDocData.author,
          title: puzzleDocData.title,
        }
        return Promise.resolve(puzzleMetadata);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch((err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

const getAllPuzzlesMetadataFromDb = (): Promise<PuzzleMetadata[]> => {

  const puzzlesMetadata: PuzzleMetadata[] = [];

  const query = Puzzle.find({});
  query.select(['id', 'title', 'author', 'sourceFileName']);
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length > 0) {
        for (const puzzleDoc of puzzleDocs) {
          const puzzleDocData: any = puzzleDoc.toObject();
          const { id, author, title, sourceFileName } = puzzleDocData;
          const puzzleMetadata: PuzzleMetadata = {
            id,
            title,
            author,
            sourceFileName,
          }
          puzzlesMetadata.push(puzzleMetadata);
        }
        return Promise.resolve(puzzlesMetadata);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch((err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

export const getPuzzle = (request: Request, response: Response, next: any) => {

  // console.log('getPuzzle');

  // console.log('request.query:');
  // console.log(request.query);

  const id: string = request.query.id as string;

  getPuzzleFromDb(id)
    .then((puzzle: PuzzleSpec) => {
      // console.log('puzzle');
      // console.log(puzzle);
      response.json(puzzle);
    })
};

const getPuzzleFromDb = (id: string): Promise<PuzzleEntity> => {
  const query = Puzzle.find({ id });
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length === 1) {
        const puzzleDocData: any = puzzleDocs[0].toObject();
        const { sourceFileName, title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = puzzleDocData;

        const puzzleEntity: PuzzleEntity = {
          id,
          sourceFileName,
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
        }
        return Promise.resolve(puzzleEntity);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch((err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

// export const getPuzData = (request: Request, response: Response, next: any) => {

//   console.log('getPuzData');

//   console.log('request.query:');
//   console.log(request.query);

//   const id: string = request.query.id as string;

//   getPuzDataFromDb(id)
//   .then((puzData: Buffer) => {
//     console.log('puzData');
//     console.log(puzData);
//     response.send(puzData);
//   })

// };

// const getPuzDataFromDb = (puzzleId: string): Promise<Buffer> => {
//   const query = Puzzle.find({ id: puzzleId });
//   query.select(['id', 'puzData']);
//   const promise = query.exec();
//   return promise
//     .then((puzzleDocs) => {
//       if (isArray(puzzleDocs) && puzzleDocs.length === 1) {
//         const puzzleDocData: any = puzzleDocs[0].toObject();
//         const puzData: Buffer = puzzleDocData.puzData.buffer;
//         return Promise.resolve(puzData);
//       } else {
//         debugger;
//         return Promise.reject('puzzle not found');
//       }
//     }).catch( (err: any) => {
//       console.log(err);
//       debugger;
//       return Promise.reject(err);
//     });
// }

export function uploadPuzzleBuffer(request: Request, response: Response, next: any) {

  console.log('loadPuzzle');

  console.log('request.query:');
  console.log(request.query);

  const { puzzleBuffer, sourceFileName } = request.body;

  const pc: PuzzleSpec = PuzCrossword.from(puzzleBuffer);
  console.log(pc);

  const { title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = pc;

  const puzzleEntity: PuzzleEntity = {
    id: uuidv4(),
    sourceFileName,
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
}

export function uploadPuzzles(request: Request, response: Response, next: any) {

  console.log('uploadPuzzles');
  console.log(request.body);

  const { uploadDateTime, puzzleSpecs } = request.body;

  for (const puzzleSpec of puzzleSpecs) {
    const { sourceFileName, title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = puzzleSpec as PuzzleSpec;

    // TEDTODO - don't add a puzzle that already exists.

    const puzzleEntity: PuzzleEntity = {
      id: uuidv4(),
      sourceFileName,
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

    // TEDTODO - create all at once
    // TEDTODO - send response on reject
    createPuzzle(puzzleEntity)
      .then((puzzleDoc) => {
        const puzzleDocument = puzzleDoc as Document;
        console.log('added userDocument');
        // console.log(puzzleDocument);
        // console.log(puzzleDocument.toObject());
      });
  }

  response.sendStatus(200);
}

