import { Request, Response } from 'express';
import { isArray } from 'lodash';
import { Document } from 'mongoose';
import Puzzle from '../models/Puzzle';
import { PuzzleMetadata } from '../types';

export const getAllPuzzlesMetadata = (request: Request, response: Response, next: any) => {
  console.log('getAllPuzzlesMetadata');

  getAllPuzzlesMetadataFromDb()
    .then((puzzlesMetadata: PuzzleMetadata[]) => {
      console.log('puzzlesMetadata');
      console.log(puzzlesMetadata);
      response.json(puzzlesMetadata);
    })
};

const getAllPuzzlesMetadataFromDb = (): Promise<PuzzleMetadata[]> => {

  const puzzlesMetadata: PuzzleMetadata[] = [];

  const query = Puzzle.find({});
  query.select(['id', 'title', 'author']);
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length > 0) {
        for (const puzzleDoc of puzzleDocs) {
          const puzzleDocData: any = puzzleDoc.toObject();
          const puzzleMetadata: PuzzleMetadata = {
            id: puzzleDocData.id,
            author: puzzleDocData.author,
            title: puzzleDocData.title,
          }
          puzzlesMetadata.push(puzzleMetadata);
        }
        return Promise.resolve(puzzlesMetadata);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch( (err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

export const getPuzzleMetadata = (request: Request, response: Response, next: any) => {

  console.log('getPuzzleMetadata');

  console.log('request.query:');
  console.log(request.query);

  const id: string = request.query.id as string;

  getPuzzleMetadataFromDb(id)
    .then((puzzleMetadata: PuzzleMetadata) => {
      console.log('puzzleMetadata');
      console.log(puzzleMetadata);
      response.json(puzzleMetadata);
    })
};

const getPuzzleMetadataFromDb = (puzzleId: string): Promise<PuzzleMetadata> => {
  const query = Puzzle.find({ id: puzzleId });
  query.select(['id', 'title', 'author']);
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length === 1) {
        const puzzleDocData: any = puzzleDocs[0].toObject();
        const puzzleMetadata: PuzzleMetadata = {
          id: puzzleDocData.id,
          author: puzzleDocData.author,
          title: puzzleDocData.title,
        }
        return Promise.resolve(puzzleMetadata);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch( (err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

export const getPuzData = (request: Request, response: Response, next: any) => {
  
  console.log('getPuzData');

  console.log('request.query:');
  console.log(request.query);

  const id: string = request.query.id as string;

  getPuzDataFromDb(id)
  .then((puzData: Buffer) => {
    console.log('puzData');
    console.log(puzData);
    response.send(puzData);
  })

};

const getPuzDataFromDb = (puzzleId: string): Promise<Buffer> => {
  const query = Puzzle.find({ id: puzzleId });
  query.select(['id', 'puzData']);
  const promise = query.exec();
  return promise
    .then((puzzleDocs) => {
      if (isArray(puzzleDocs) && puzzleDocs.length === 1) {
        const puzzleDocData: any = puzzleDocs[0].toObject();
        const puzData: Buffer = puzzleDocData.puzData.buffer;
        return Promise.resolve(puzData);
      } else {
        debugger;
        return Promise.reject('puzzle not found');
      }
    }).catch( (err: any) => {
      console.log(err);
      debugger;
      return Promise.reject(err);
    });
}

