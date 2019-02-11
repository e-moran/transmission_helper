import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchResult } from './searchresult';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchApiService {
  private searchUrl = '/api/search/';

  constructor(private http: HttpClient) { }

  public search(query: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(this.searchUrl + query);
  }
}
