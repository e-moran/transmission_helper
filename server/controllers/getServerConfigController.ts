import { ServerConfig } from '../models/serverConfig';
import * as fs from 'fs';
import * as path from 'path';

export class GetServerConfigController {
    constructor() { }
    public static async getServerConfig(): Promise<ServerConfig> {
        return JSON.parse(fs.readFileSync(path.join(__dirname, '../models/serverConfig.json'), 'utf-8'));
    }
}
