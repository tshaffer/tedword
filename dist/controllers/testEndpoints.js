"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPuzzle = exports.createUser = void 0;
const fs = __importStar(require("fs"));
// import * as multer from 'multer'
var multer = require('multer');
const uuid_1 = require("uuid");
const dbInterface_1 = require("./dbInterface");
const PuzCrossword = require('@confuzzle/puz-crossword').PuzCrossword;
function createUser(request, response, next) {
    console.log('createUser');
    console.log(request.body);
    const { userName, password, email, cellTextColorPartnerBoard } = request.body;
    const userEntity = {
        userName,
        password,
        email,
        cellTextColorPartnerBoard,
    };
    // TEDTODO - send response on reject
    dbInterface_1.createUserDocument(userEntity)
        .then((userDoc) => {
        const userDocument = userDoc;
        console.log('added userDocument');
        console.log(userDocument);
        console.log(userDocument.toObject());
        response.status(201).json({
            success: true,
            data: userDocument,
        });
    });
}
exports.createUser = createUser;
function loadPuzzle(request, response, next) {
    console.log('loadPuzzle');
    console.log('request.query:');
    console.log(request.query);
    const puzzlePath = request.query.puzzlePath;
    fs.readFile(puzzlePath, (err, puzData) => {
        if (err)
            throw err;
        console.log(puzData);
        const pc = PuzCrossword.from(puzData);
        console.log(pc);
        const { title, author, copyright, note, width, height, clues, solution, state, hasState, parsedClues } = pc;
        const puzzleEntity = {
            id: uuid_1.v4(),
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
        dbInterface_1.createPuzzle(puzzleEntity)
            .then((puzzleDoc) => {
            const puzzleDocument = puzzleDoc;
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
exports.loadPuzzle = loadPuzzle;
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
//# sourceMappingURL=testEndpoints.js.map