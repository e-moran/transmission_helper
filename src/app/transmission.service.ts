import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerConfigService } from './server-config.service';
import { FilmType } from './serverconfig';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private proxyUrl = ':1337/';

  constructor(private http: HttpClient, private configService: ServerConfigService) { }
  public addTorrent(magnet: string, folder: FilmType) {
    let url = 'http:' + window.location.origin.split(':')[1] + this.proxyUrl;
    this.configService.getServerConfig().toPromise().then(res => {
      url += res.transmissionConfig.rpcUrl;
      console.log(url);
      const body = '{"arguments":{"filename":"' + magnet + '", "download-dir":"' + folder.path + '"},"method":"torrent-add"}';
      this.http.post(url, body).subscribe();
    });
  }
}
