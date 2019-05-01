import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ServerConfigService } from './server-config.service';
import { FilmType, ServerConfig } from './serverconfig';
import { map } from 'rxjs/operators';
import {FreeSpaceResponse, TorrentStatus, TorrentStatusResponse} from './transmission-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private proxyUrl = ':1337/';

  static getHttpOptions(config: ServerConfig) {
    if (config.transmissionConfig.requiresAuth) {
      return {
        headers: new HttpHeaders({
          Authorization: 'Basic ' + btoa(config.transmissionConfig.username + ':' + config.transmissionConfig.password)
        })
      };
    } else {
      return {};
    }
  }
  constructor(private http: HttpClient, private configService: ServerConfigService) { }
  public addTorrent(magnet: string, folder: FilmType) {
    this.configService.getServerConfig().toPromise().then(res => {
      const body = '{"arguments":{"filename":"' + magnet + '", "download-dir":"' + folder.path + '"},"method":"torrent-add"}';
      this.http.post(this.generateUrl(res), body, this.getHttpOptions(res)).subscribe();
    });
  }
  public getStatus(config: ServerConfig): Observable<TorrentStatus[]> {
    const body = {
      arguments: {
        fields: [ 'name', 'status', 'percentDone', 'eta', 'id' ]
      },
      method: 'torrent-get'
    };
    return this.http.post(this.generateUrl(config), body, TransmissionService.getHttpOptions(config)).pipe(
        map((result: TorrentStatusResponse) => {
          return result.arguments.torrents;
        })
    );
  }
  public deleteTorrent(id: number, config: ServerConfig) {
    const body = {
      arguments: {
        ids: [id],
        'delete-local-data': true
      },
      method: 'torrent-remove'
    };
    return this.http.post(this.generateUrl(config), body, TransmissionService.getHttpOptions(config));
  }
  public getFreeSpace(folder: FilmType, config: ServerConfig): Observable<number> {
    const body = {
      arguments: {
        path: folder.path
      },
      method: 'free-space'
    };
    return this.http.post(this.generateUrl(config), body, TransmissionService.getHttpOptions(config)).pipe(
        map((result: FreeSpaceResponse) => {
          console.log(result.arguments['size-bytes']);
          return result.arguments['size-bytes'];
        })
    );
  }
  private generateUrl(config: ServerConfig): string {
    return 'http:' + window.location.origin.split(':')[1] + this.proxyUrl + config.transmissionConfig.rpcUrl;
  }
}
