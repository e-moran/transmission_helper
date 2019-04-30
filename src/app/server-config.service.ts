import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ServerConfig, ServerConfigResponse} from './serverconfig';
import {Observable, throwError } from 'rxjs';
import {catchError, map, publishReplay, refCount} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerConfigService {
  private getConfigUrl = '/api/getconfig';
  private setConfigUrl = '/api/setconfig';
  private cachedConfig: Observable<ServerConfig>;

  constructor(private http: HttpClient) { }
  public getServerConfig(): Observable<ServerConfig> {
      if (!this.cachedConfig) {
          this.cachedConfig = this.http.get<ServerConfigResponse>(this.getConfigUrl)
              .pipe(
                  map((resp: ServerConfigResponse) => {
                      return resp.conf;
                  }),
                  catchError(error => {
                      return throwError(error);
                  }),
                  publishReplay(1),
                  refCount()
              );
      }
      return this.cachedConfig;
  }
  public updateServerConfig(conf: ServerConfig): Observable<any> {
      return this.http.post(this.setConfigUrl, conf);
  }
}
