"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPuzzles = exports.getPuzzle = exports.getPuzzleMetadata = exports.getAllPuzzlesMetadata = void 0;
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const Puzzle_1 = __importDefault(require("../models/Puzzle"));
const dbInterface_1 = require("./dbInterface");
exports.getAllPuzzlesMetadata = (request, response, next) => {
    console.log('getAllPuzzlesMetadata');
    getAllPuzzlesMetadataFromDb()
        .then((puzzlesMetadata) => {
        console.log('puzzlesMetadata');
        console.log(puzzlesMetadata);
        response.json(puzzlesMetadata);
    });
};
exports.getPuzzleMetadata = (request, response, next) => {
    console.log('getPuzzleMetadata');
    console.log('request.query:');
    console.log(request.query);
    const id = request.query.id;
    getPuzzleMetadataFromDb(id)
        .then((puzzleMetadata) => {
        console.log('puzzleMetadata');
        // console.log(puzzleMetadata);
        response.json(puzzleMetadata);
    });
};
const getPuzzleMetadataFromDb = (puzzleId) => {
    const query = Puzzle_1.default.find({ id: puzzleId });
    query.select(['id', 'title', 'author', 'sourceFileName']);
    const promise = query.exec();
    return promise
        .then((puzzleDocs) => {
        if (lodash_1.isArray(puzzleDocs) && puzzleDocs.length === 1) {
            const puzzleDocData = puzzleDocs[0].toObject();
            const puzzleMetadata = {
                id: puzzleDocData.id,
                sourceFileName: puzzleDocData.sourceFileName,
                author: puzzleDocData.author,
                title: puzzleDocData.title,
            };
            return Promise.resolve(puzzleMetadata);
        }
        else {
            debugger;
            return Promise.reject('puzzle not found');
        }
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
const getAllPuzzlesMetadataFromDb = () => {
    const puzzlesMetadata = [];
    const query = Puzzle_1.default.find({});
    query.select(['id', 'title', 'author', 'sourceFileName']);
    const promise = query.exec();
    return promise
        .then((puzzleDocs) => {
        if (lodash_1.isArray(puzzleDocs) && puzzleDocs.length > 0) {
            for (const puzzleDoc of puzzleDocs) {
                const puzzleDocData = puzzleDoc.toObject();
                const { id, author, title, sourceFileName } = puzzleDocData;
                const puzzleMetadata = {
                    id,
                    title,
                    author,
                    sourceFileName,
                };
                puzzlesMetadata.push(puzzleMetadata);
            }
            return Promise.resolve(puzzlesMetadata);
        }
        else {
            debugger;
            return Promise.reject('puzzle not found');
        }
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
exports.getPuzzle = (request, response, next) => {
    console.log('getPuzzle');
    console.log('request.query:');
    console.log(request.query);
    const id = request.query.id;
    getPuzzleFromDb(id)
        .then((puzzle) => {
        console.log('puzzle');
        // console.log(puzzle);
        response.json(puzzle);
    });
};
const getPuzzleFromDb = (id) => {
    const query = Puzzle_1.default.find({ id });
    const promise = query.exec();
    return promise
        .then((puzzleDocs) => {
        if (lodash_1.isArray(puzzleDocs) && puzzleDocs.length === 1) {
            const puzzleDocData = puzzleDocs[0].toObject();
            const { sourceFileName, title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = puzzleDocData;
            const puzzleEntity = {
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
            };
            return Promise.resolve(puzzleEntity);
        }
        else {
            debugger;
            return Promise.reject('puzzle not found');
        }
    }).catch((err) => {
        console.log(err);
        debugger;
        return Promise.reject(err);
    });
};
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
function uploadPuzzles(request, response, next) {
    console.log('uploadPuzzles');
    console.log(request.body);
    const { uploadDateTime, puzzleSpecs } = request.body;
    for (const puzzleSpec of puzzleSpecs) {
        const { sourceFileName, title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = puzzleSpec;
        // TEDTODO - don't add a puzzle that already exists.
        const puzzleEntity = {
            id: uuid_1.v4(),
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
        dbInterface_1.createPuzzle(puzzleEntity)
            .then((puzzleDoc) => {
            const puzzleDocument = puzzleDoc;
            console.log('added userDocument');
            // console.log(puzzleDocument);
            // console.log(puzzleDocument.toObject());
        });
    }
    response.sendStatus(200);
}
exports.uploadPuzzles = uploadPuzzles;
//# sourceMappingURL=puzzles.js.map