import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransmissionService {

  private transmissionUrl = 'http://localhost:1337/localhost:9091/transmission/rpc';

  constructor(private http: HttpClient) { }
  public addTorrent(magnet: string): Observable<any> {
    const body = '{"arguments":{"filename":"' + magnet + '"},"method":"torrent-add"}';
    return this.http.post(this.transmissionUrl, body);
  }
}
