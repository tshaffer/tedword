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
exports.readConfig = exports.tedwordConfiguration = void 0;
const dotenv = __importStar(require("dotenv"));
const lodash_1 = require("lodash");
exports.readConfig = (pathToConfigFile) => {
    try {
        const configOutput = dotenv.config({ path: pathToConfigFile });
        const parsedConfig = configOutput.parsed;
        if (!lodash_1.isNil(parsedConfig)) {
            exports.tedwordConfiguration = {
                MONGO_URI: parsedConfig.MONGO_URI,
                PUSHER_APP_ID: parsedConfig.PUSHER_APP_ID,
                PUSHER_APP_KEY: parsedConfig.PUSHER_APP_ID,
                PUSHER_APP_SECRET: parsedConfig.PUSHER_APP_ID,
                PUSHER_APP_CLUSTER: parsedConfig.PUSHER_APP_ID,
                PORT: Number(parsedConfig.PORT),
            };
            console.log(exports.tedwordConfiguration);
        }
    }
    catch (err) {
        console.log('Dotenv config error: ' + err.message);
    }
};
//# sourceMappingURL=config.js.map