import {ServerConfig} from '../models/serverConfig';
import * as fs from 'fs';
import * as path from 'path';

export class SetServerConfigController {
    constructor(private newConf: ServerConfig) { }
    public setServerConfig(): boolean {
        fs.writeFile(path.join(__dirname, '../models/serverConfig.json'), JSON.stringify(this.newConf), err => {
            if (err) {
                console.log(err);
                return false;
            }
        });
        return true;
    }
}
