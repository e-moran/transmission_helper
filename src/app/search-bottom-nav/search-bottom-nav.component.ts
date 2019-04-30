import { Component, Input, OnInit } from '@angular/core';
import { Result } from '../searchresult';
import { SearchApiService } from '../search-api.service';
import { TransmissionService } from '../transmission.service';
import { MatDialog } from '@angular/material';
import { SearchAddDialogComponent } from '../search-add-dialog/search-add-dialog.component';
import { ServerConfigService } from '../server-config.service';

@Component({
  selector: 'app-search-bottom-nav',
  templateUrl: './search-bottom-nav.component.html',
  styleUrls: ['./search-bottom-nav.component.scss']
})
export class SearchBottomNavComponent implements OnInit {
  private _selectedArray: Result[];

  @Input()
  set selectedArray(selectedArray: Result[]) {
    this._selectedArray = selectedArray;
  }

  constructor(
      private searchApi: SearchApiService,
      private transmissionApi: TransmissionService,
      private configApi: ServerConfigService,
      private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public addTorrents() {
    const dialogRef = this.dialog.open(SearchAddDialogComponent, {
      width: '250px',
      data: {
        torrents: this._selectedArray
      }
    });

    dialogRef.afterClosed().subscribe(folder => {
      if (folder) {
        this._selectedArray.forEach((res) => {
          this.searchApi.getMagnet(res.url, res.provider).subscribe(magnetValue => {
            this.transmissionApi.addTorrent(magnetValue.magnetUrl, folder);
          });
          res.clicked = false;
        });
        this._selectedArray.splice(0, this._selectedArray.length);
      }
    });
  }
}
