import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MagnetResult, SearchResult} from './searchresult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  private searchUrl = '/api/search/';
  private magnetUrl = '/api/magnet/';

  constructor(private http: HttpClient) { }

  public search(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(this.searchUrl + query);
  }

  public getMagnet(url: string, provider: string): Observable<MagnetResult> {
    return this.http.get<MagnetResult>(this.magnetUrl + encodeURIComponent(url) + '/' + encodeURIComponent(provider));
  }
}
