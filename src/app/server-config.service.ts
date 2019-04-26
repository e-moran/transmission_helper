import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServerConfig, ServerConfigResponse} from './serverconfig';
import {Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
  private configUrl = '/api/getConfig';

  constructor(private http: HttpClient) { }
  public getServerConfig(): Observable<ServerConfig> {
    return this.http.get<ServerConfigResponse>(this.configUrl)
        .pipe(
            map( (resp: ServerConfigResponse) => {
              return resp.conf;
            }),
            catchError(error => {
              return throwError(error);
            })
        );
  }
}
