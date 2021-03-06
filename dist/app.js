"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
// import cookieParser from 'cookie-parser';
const config_1 = require("./config");
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const routes_1 = require("./routes/routes");
const users_1 = __importDefault(require("./routes/users"));
const controllers_1 = require("./controllers");
class App {
    constructor() {
        this.route = new routes_1.Routes();
        config_1.readConfig('/Users/tedshaffer/Documents/Projects/tedword/src/config/config.env');
        db_1.default();
        exports.pusher = new Pusher({
            appId: process.env.PUSHER_APP_ID,
            key: process.env.PUSHER_APP_KEY,
            secret: process.env.PUSHER_APP_SECRET,
            cluster: process.env.PUSHER_APP_CLUSTER,
            encrypted: true,
        });
        this.app = express_1.default();
        this.config();
        this.app.use(express_1.default.static(__dirname + '/public'));
        this.app.use(cors_1.default());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express_session_1.default({
            secret: 'somesuperdupersecret',
            resave: true,
            saveUninitialized: true
        }));
        this.route.routes(this.app);
        // app routes
        this.app.get('/api/v1/version', controllers_1.getVersion);
        // user routes
        this.app.use('/api/v1', users_1.default);
        this.app.get('/api/v1/users', controllers_1.getUsers);
        // puzzle routes
        this.app.get('/api/v1/loadPuzzle', controllers_1.loadPuzzle);
        this.app.get('/api/v1/allPuzzlesMetadata', controllers_1.getAllPuzzlesMetadata);
        this.app.get('/api/v1/puzzleMetadata', controllers_1.getPuzzleMetadata);
        this.app.get('/api/v1/puzzle', controllers_1.getPuzzle);
        this.app.post('/api/v1/uploadPuzzles', controllers_1.uploadPuzzles);
        this.app.post('/api/v1/uploadPuzzleBuffer', controllers_1.uploadPuzzleBuffer);
        // board routes
        this.app.get('/api/v1/boards', controllers_1.getBoards);
        this.app.post('/api/v1/board', controllers_1.createBoard);
        this.app.post('/api/v1/deleteGames', controllers_1.deleteBoards);
        this.app.post('/api/v1/addUserToBoard', controllers_1.addUserToBoard);
        this.app.post('/api/v1/updateLastPlayedDateTime', controllers_1.updateLastPlayedDateTime);
        this.app.post('/api/v1/updateElapsedTime', controllers_1.updateElapsedTime);
        // chat routes
        this.app.get('/api/v1/chatMessages', controllers_1.getChatMessages);
        this.app.post('/api/v1/joinChat', controllers_1.joinChat);
        this.app.post('/pusher/auth', controllers_1.authenticateChat);
        this.app.post('/api/v1/sendMessage', controllers_1.sendChatMessage);
    }
    config() {
        let port = process.env.PORT;
        if (port === undefined || port === null || port === '') {
            port = 8888;
        }
        this.app.set('port', port);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map