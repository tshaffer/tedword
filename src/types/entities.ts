import { PuzzleSpec } from "./baseTypes";

export interface BoardEntity {
  id: string;
  puzzleId: string;
  title: string;
  users: string[];
  cellContents?: CellContentsMap;
  startDateTime: Date;
  lastPlayedDateTime: Date;
  elapsedTime: number;
  solved: boolean;
  difficulty: number;
}

export interface CellContents {
  row: number;
  column: number;
}

export interface CellContentsMap {
  [id: string]: CellContents;
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

