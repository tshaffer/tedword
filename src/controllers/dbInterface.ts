import { isArray, ValueIteratorTypeGuard } from 'lodash';
import { Document } from 'mongoose';

import { BoardEntity, PuzzleEntity, UserEntity } from 'entities';
import Board from '../models/Board';
import Puzzle from '../models/Puzzle';
import User from '../models/User';

export const createUserDocument = (userEntity: UserEntity): Promise<any> => {
  return User.create(userEntity)
    .then((user: Document) => {
      return Promise.resolve(user);
    });
};

export const createPuzzle = (puzzleEntity: PuzzleEntity): Promise<any> => {
  return Puzzle.create(puzzleEntity)
    .then((puzzle: Document) => {
      return Promise.resolve(puzzle);
    });
};

export const getBoardsFromDb = ():  Promise<BoardEntity[]> => {
  const query = Board.find({});
  const promise: Promise<Document[]> = query.exec();
  return promise.then((boardDocuments: Document[]) => {
    const boardEntities: BoardEntity[] = boardDocuments.map((boardDocument: any) => {

      const boardDocAsObj: any = boardDocument.toObject();
      const boardEntity: BoardEntity = boardDocument.toObject();

      boardEntity.cellContents = {};

      const cellContentsMap: Map<string, string> = boardDocAsObj.cellContents;
      for (const key of cellContentsMap.keys()) {
        boardEntity.cellContents[key] = cellContentsMap.get(key);
      }

      return boardEntity;
    });
    return Promise.resolve(boardEntities);
  });
}

export const createBoardDocument = (boardEntity: BoardEntity): Promise<any> => {
  return Board.create(boardEntity)
    .then((board: Document) => {
      return Promise.resolve(board);
    });
};

export const updateCellContents = (
  boardId: string,
  row: number,
  col: number,
  typedChar: string
): void => {
  console.log('updateCellContents');
  console.log(boardId);
  console.log(row);
  console.log(col);
  console.log(typedChar);

  Board.find(
    {
      id: boardId,
    },
    (err, boardDocs: any) => {
      if (isArray(boardDocs) && boardDocs.length === 1) {

        const boardDoc: any = boardDocs[0];
        console.log(boardDoc);

        dumpCellContents(boardDoc.cellContents);

        const key = row.toString() + '_' + col.toString();
        console.log('key = ' + key);

        boardDoc.cellContents.set(key, typedChar);
        dumpCellContents(boardDoc.cellContents);

        boardDoc.save();
      }
    });

  const dumpCellContents = (map: any) => {
    for (const key of map.keys()) {
      console.log(key);
    }
    for (const val of map.values()) {
      console.log(val);
    }
  }

  // const filter = { id: boardId };

  // const cellContents: any = {};

  // const update = {
  //   cellContents
  // };

  // const query = Board.findOneAndUpdate(
  //   filter,
  //   update,
  // );

  // const promise: Promise<Document> = query.exec();
  // return promise
  //   .then((board: Document) => {
  //     console.log('updated board');
  //     console.log(board);
  //     console.log(board.toObject());
  //     return Promise.resolve(board);
  //   }).catch((err: any) => {
  //     console.log(err);
  //     debugger;
  //     return Promise.reject(err);
  //   });
}

// export const createUserDocuments = (userDocuments: UserEntity[]): Promise<Document[]> => {
//   return new Promise((resolve: any, reject: any) => {
//     User.collection.insert(userDocuments, (err, docs) => {
//       if (err) {
//         console.log(err);
//         if (err.code === 11000) {
//           console.log('createUserDocuments: duplicate key error');
//           resolve([]);
//         } else {
//           reject(err);
//         }
//       }
//       else {
//         console.log(docs);
//         resolve(docs);
//       }
//     });
//   });
// };

