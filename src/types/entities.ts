import { PuzzleSpec } from './baseTypes';

export interface BoardEntity {
  id: string;
  puzzleId: string;
  title: string;
  users: string[];
  cellContents: CellContentsMap;
  startDateTime: Date;
  lastPlayedDateTime: Date;
  elapsedTime: number;
  solved: boolean;
  difficulty: number;
}

export interface ChatSessionEntity {
  id: string;
  boardId: string;
  chatMessages: Chat[];
}

export interface Chat {
  sender: string;
  message: string;
  timestamp: Date;
}

export interface CellContentsValue {
  user: string;
  typedChar: string;
}

export interface CellContentsMap {
  [id: string]: CellContentsValue;
}

export interface PuzzleEntity extends PuzzleSpec {
  id: string;
}

export interface UserEntity {
  userName: string;
  password: string;
  email: string;
  cellTextColorPartnerBoard: string;
}

