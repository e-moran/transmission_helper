import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AddDialogData } from './dialog-data';
import { FilmType } from '../serverconfig';
import { ServerConfigService } from '../server-config.service';

@Component({
  selector: 'app-search-add-dialog',
  templateUrl: './search-add-dialog.component.html',
  styleUrls: ['./search-add-dialog.component.scss']
})
export class SearchAddDialogComponent implements OnInit {
  private selection: FilmType = null;
  public folders: FilmType[];
  constructor(
      public dialogRef: MatDialogRef<SearchAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
      private configApi: ServerConfigService
  ) { }

  ngOnInit() {
    this.configApi.getServerConfig().subscribe(config => {
      this.folders = config.folders;
    });
  }
  onCancel(): void {
    console.log(this.selection);
    this.dialogRef.close();
  }
}

