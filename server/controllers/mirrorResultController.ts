import * as torrentSearch from 'torrent-search-api';

export class MirrorResultController {
    constructor(private url: string, private provider: string) {

    }

    public async getMagnet(): Promise<string> {
        let magnetUrl = '';
        await torrentSearch.getMagnet({desc: this.url, provider: this.provider}).then(value => {
            magnetUrl = value;
        }).catch(error => {
            console.log(error);
        });

        return magnetUrl;
    }
}
