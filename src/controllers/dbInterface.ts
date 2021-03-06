import { isArray, isNil } from 'lodash';
import { Document } from 'mongoose';

import { BoardEntity, CellContentsValue, Chat, ChatSessionEntity, PuzzleEntity, UserEntity } from 'entities';
import Board from '../models/Board';
import ChatSession from '../models/ChatSession';
import Puzzle from '../models/Puzzle';
import User from '../models/User';
import { resolve } from 'dns';

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

export const getBoardsFromDb = (): Promise<BoardEntity[]> => {

  const query = Board.find({});
  const promise: Promise<Document[]> = query.exec();
  return promise.then((boardDocuments: Document[]) => {

    console.log('boardDocuments');
    // console.log(boardDocuments);

    const boardEntities: BoardEntity[] = boardDocuments.map((boardDocument: any) => {

      console.log('boardDocument', boardDocument);
      const boardDocAsObj: any = boardDocument.toObject();
      console.log('boardDocAsObj', boardDocAsObj);
      const boardEntity: BoardEntity = boardDocument.toObject();
      console.log('boardEntity', boardEntity);

      boardEntity.cellContents = {};

      const cellContentsMap: Map<string, CellContentsValue> = boardDocAsObj.cellContents;
      console.log('cellContentsMap', cellContentsMap);

      if (!isNil(cellContentsMap)) {
        for (const key of cellContentsMap.keys()) {
          boardEntity.cellContents[key] = cellContentsMap.get(key);
        }
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

export const deleteBoardDocuments = (boardIds: string[]): Promise<any> => {
  const query =  Board.deleteMany({ id: { $in: boardIds }});
  query.exec();
  return query.exec();
}

export const updateCellContents = (
  boardId: string,
  user: string,
  row: number,
  col: number,
  typedChar: string
): void => {
  console.log('updateCellContents');
  console.log(boardId);
  console.log(user);
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

        dumpCellContents(boardDoc.cellContents);

        const key = row.toString() + '_' + col.toString();

        const cellContentsValue: any = {
          user,
          typedChar
        };

        boardDoc.cellContents.set(key, cellContentsValue);
        dumpCellContents(boardDoc.cellContents);

        boardDoc.save();
      }
    });

  const dumpCellContents = (map: any) => {
    console.log('dumpCellContents');
    for (const key of map.keys()) {
      console.log(key);
    }
    for (const val of map.values()) {
      console.log(val);
    }
  }

}

export const addUserToBoardDb = (boardId: string, userName: string): void => {

  Board.find(
    {
      id: boardId,
    },
    (err, boardDocs: any) => {
      if (err) {
        console.log(err);
      } else
        // TEDTODO - check for user already exists in .users
        if (isArray(boardDocs) && boardDocs.length === 1) {
          const boardDoc: any = boardDocs[0];
          (boardDoc as BoardEntity).users.push(userName);
          boardDoc.save();
        }
    });
}

export const updateLastPlayedDateTimeDb = (boardId: string, lastPlayedDateTime: Date): void => {
  Board.find({ id: boardId, }
    , (err, boardDocs: any) => {
      if (err) {
        console.log(err);
      } else
        if (isArray(boardDocs) && boardDocs.length === 1) {
          const boardDoc: any = boardDocs[0];
          (boardDoc as BoardEntity).lastPlayedDateTime = lastPlayedDateTime;
          boardDoc.save();
        }
    });
}

export const updateElapsedTimeDb = (boardId: string, elapsedTime: number): void => {
  Board.find({ id: boardId, }
    , (err, boardDocs: any) => {
      if (err) {
        console.log(err);
      } else
        if (isArray(boardDocs) && boardDocs.length === 1) {
          const boardDoc: any = boardDocs[0];
          (boardDoc as BoardEntity).elapsedTime = elapsedTime;
          boardDoc.save();
        }
    });
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

// timestamp - passed in or generated here?
// algorithm
//    does a ChatSession already exist for this boardId?
//      if not, create one
//    get ChatSessionId
//    append specified chat to this chatSession
export const addChatMessageToDb = (chatSessionId: string, userName: string, message: string) => {
  ChatSession.find(
    {
      id: chatSessionId,
    },
    (err, chatSessionDocs: any) => {
      if (err) {
        console.log(err);
      } else
      if (isArray(chatSessionDocs) && chatSessionDocs.length === 1) {
        const chatSessionDoc: any = chatSessionDocs[0];
        const chat: Chat = { sender: userName, message, timestamp: new Date() };
        (chatSessionDoc as ChatSessionEntity).chatMessages.push(chat);
        chatSessionDoc.save();
      }
    }
  )
};

export const getChatSession = (boardId: string): Promise<ChatSessionEntity | null> => {
  const query = ChatSession.find({ boardId });
  const promise: Promise<Document[]> = query.exec();
  return promise.then((chatSessionDocuments: Document[]) => {
    console.log('chatSessionDocuments');
    if (isArray(chatSessionDocuments) && chatSessionDocuments.length === 1) {
      const chatSessionDocument = chatSessionDocuments[0];
      console.log('chatSessionDocument', chatSessionDocument);
      const chatSessionEntity: ChatSessionEntity = chatSessionDocument.toObject() as ChatSessionEntity;
      return Promise.resolve(chatSessionEntity);
    }
    else {
      return Promise.resolve(null);
    }
  });
};

export const createChatSessionDocument = (chatSessionEntity: ChatSessionEntity): Promise<Document> => {
  return ChatSession.create(chatSessionEntity)
    .then((chatSession: Document) => {
      return Promise.resolve(chatSession);
    });
}

