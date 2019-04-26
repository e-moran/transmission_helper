import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../searchresult';
import { SearchApiService } from '../search-api.service';
import { TransmissionService } from '../transmission.service';

@Component({
  selector: 'app-search-bottom-nav',
  templateUrl: './search-bottom-nav.component.html',
  styleUrls: ['./search-bottom-nav.component.scss']
})
export class SearchBottomNavComponent implements OnInit {
  private _selectedArray;

  @Input()
  set selectedArray(selectedArray: Result[]) {
    this._selectedArray = selectedArray;
  }

  constructor(private searchApi: SearchApiService, private transmissionApi: TransmissionService) { }

  ngOnInit() {
  }

  public addTorrents() {
    this._selectedArray.forEach((res) => {
      this.searchApi.getMagnet(res.url, res.provider).subscribe(magnetValue => {
        this.transmissionApi.addTorrent(magnetValue.magnetUrl);
      });
    });
  }
}
