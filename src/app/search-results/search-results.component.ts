import { Component, OnInit, Input } from '@angular/core';
import { SearchApiService } from '../search-api.service';
import { SearchResult } from '../searchresult';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public _term: string;
  public searchResults: SearchResult;

  constructor(private searchApi: SearchApiService) { }

  ngOnInit() {
  }

  @Input()
  set term(term: string) {
    if (term) {
      this._term = term;
      this.search();
    }
  }

  private search() {
    this.searchApi.search(this._term).subscribe(value => this.searchResults = value);
  }
}
