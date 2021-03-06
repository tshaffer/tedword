export interface TedwordConfiguration {
  MONGO_URI: string;
  PUSHER_APP_ID: string;
  PUSHER_APP_KEY: string;
  PUSHER_APP_SECRET: string;
  PUSHER_APP_CLUSTER: string;
  PORT: number;
}

export interface PuzzleSpec {
  title: string;
  author: string;
  copyright: string;
  sourceFileName: string;
  note: string;
  width: number;
  height: number;
  clues: string[];
  solution: string;
  state: string;
  hasState: boolean;
  parsedClues: ParsedClue[];
}

export interface ParsedClue {
  col: number;
  isAcross: boolean;
  length: number;
  number: number;
  row: number;
  solution: string;
  state: string;
  text: string;
}

export interface PuzzleMetadata {
  id: string;
  author: string;
  title: string;
  sourceFileName: string;
}
