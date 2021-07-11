import * as dotenv from 'dotenv';
import { isNil } from 'lodash';
import { TedwordConfiguration } from '../types';

export let tedwordConfiguration: TedwordConfiguration; 

export const readConfig = (pathToConfigFile: string): void => {

  try {
    const configOutput: dotenv.DotenvConfigOutput = dotenv.config({ path: pathToConfigFile });
    const parsedConfig: dotenv.DotenvParseOutput | undefined = configOutput.parsed;

    if (!isNil(parsedConfig)) {
      tedwordConfiguration = {
        MONGO_URI: parsedConfig.MONGO_URI,
        PUSHER_APP_ID: parsedConfig.PUSHER_APP_ID,
        PUSHER_APP_KEY: parsedConfig.PUSHER_APP_ID,
        PUSHER_APP_SECRET: parsedConfig.PUSHER_APP_ID,
        PUSHER_APP_CLUSTER: parsedConfig.PUSHER_APP_ID,
        PORT: Number(parsedConfig.PORT),
      };
      console.log(tedwordConfiguration);
    }
  }
  catch (err) {
    console.log('Dotenv config error: ' + err.message);
  }
};
