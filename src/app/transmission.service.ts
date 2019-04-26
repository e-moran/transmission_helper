import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServerConfigService} from './server-config.service';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private proxyUrl = 'http://localhost:1337/';

  constructor(private http: HttpClient, private configService: ServerConfigService) { }
  public addTorrent(magnet: string) {
    this.configService.getServerConfig().toPromise().then(res => {
      const url = this.proxyUrl + res.transmissionConfig.rpcUrl;
      const body = '{"arguments":{"filename":"' + magnet + '", "download-dir":"' + res.moviesFolder + '"},"method":"torrent-add"}';
      this.http.post(url, body).subscribe();
    });
  }
}
