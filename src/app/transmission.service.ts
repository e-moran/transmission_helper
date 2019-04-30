import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
      const body = '{"arguments":{"filename":"' + magnet + '", "download-dir":"' + folder.path + '"},"method":"torrent-add"}';
      if (res.transmissionConfig.requiresAuth) {
        const httpOptions = {
          headers: new HttpHeaders({
            Authorization: 'Basic ' + btoa(res.transmissionConfig.username + ':' + res.transmissionConfig.password)
          })
        };
        this.http.post(url, body, httpOptions).subscribe();
      } else {
        this.http.post(url, body).subscribe();
      }
    });
  }
}
