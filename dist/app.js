"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pusher = void 0;
const express_1 = __importDefault(require("express"));
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
        this.route.routes(this.app);
        // user routes
        this.app.use('/api/v1', users_1.default);
        this.app.get('/api/v1/users', controllers_1.getUsers);
        // puzzle routes
        this.app.get('/api/v1/loadPuzzle', controllers_1.loadPuzzle);
        this.app.get('/api/v1/allPuzzlesMetadata', controllers_1.getAllPuzzlesMetadata);
        this.app.get('/api/v1/puzzleMetadata', controllers_1.getPuzzleMetadata);
        this.app.get('/api/v1/puzzle', controllers_1.getPuzzle);
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