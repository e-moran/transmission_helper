import { Component, OnInit, Input } from '@angular/core';
import { SearchApiService } from '../search-api.service';
import { Result, SearchResult} from '../searchresult';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  public _term: string;
  public searchResults: SearchResult;

  @Input() selectedArray: Result[] = [];
  @Input()
  set term(term: string) {
    if (term) {
      this._term = term;
      this.searchResults = null;
      this.search();
    }
  }

  constructor(private searchApi: SearchApiService) {
  }

  ngOnInit() {
  }

  private search() {
    this.searchApi.search(this._term).subscribe(value => this.searchResults = value);
  }
  public toggleTorrent(torrent: Result) {
    if (!torrent.clicked) {
      this.selectedArray.push(torrent);
      torrent.clicked = true;
    } else {
      const index = this.selectedArray.indexOf(torrent);
      if (index !== -1) {
        this.selectedArray.splice(index, 1);
      }
      torrent.clicked = false;
    }
  }
}
