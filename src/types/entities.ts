export interface BoardEntity {
  id: string;
  puzzleId: string;
  users: any[];
  cellContents: string;
  startDateTime: Date;
  lastPlayedDateTime: Date;
  elapsedTime: number;
  solved: boolean;
  difficulty: number;
}

export interface PuzzleEntity {
  id: string;
  title: string;
  author: string;
  puzData: Buffer;
}

export interface UserEntity {
  userName: string;
  password: string;
  email: string;
  cellTextColorPartnerBoard: string;
}
