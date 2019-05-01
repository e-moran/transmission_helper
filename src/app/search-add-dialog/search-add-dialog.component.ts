import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddDialogData } from './dialog-data';
import { FilmType } from '../serverconfig';
import { ServerConfigService } from '../server-config.service';
import { TransmissionService } from '../transmission.service';

@Component({
  selector: 'app-search-add-dialog',
  templateUrl: './search-add-dialog.component.html',
  styleUrls: ['./search-add-dialog.component.scss']
})
export class SearchAddDialogComponent implements OnInit {
  private selection: FilmType = null;
  public loaded = false;
  public folders: FilmType[];
  constructor(
      public dialogRef: MatDialogRef<SearchAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
      private configApi: ServerConfigService,
      public transmissionApi: TransmissionService
  ) { }

  ngOnInit() {
    this.configApi.getServerConfig().subscribe(config => {
      this.folders = config.folders;
      this.folders.forEach(folder => {
        this.transmissionApi.getFreeSpace(folder, config).subscribe(freeSpace => {
          folder.freeSpace = freeSpace;
          this.loaded = true;
        });
      });
    });
  }
  onCancel(): void {
    console.log(this.selection);
    this.dialogRef.close();
  }
}

