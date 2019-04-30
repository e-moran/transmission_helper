import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { ServerConfigService } from '../server-config.service';
import { ServerConfig } from '../serverconfig';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-server-config',
  templateUrl: './server-config.component.html',
  styleUrls: ['./server-config.component.scss']
})
export class ServerConfigComponent implements OnInit {
  public configForm: FormGroup;
  public loaded = false;
  constructor(private fb: FormBuilder, private configApi: ServerConfigService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.configApi.getServerConfig().subscribe(val => {
      console.log(val);
      this.configForm = this.fb.group({
        transmissionConfig: this.fb.group({
          requiresAuth: [val.transmissionConfig.requiresAuth],
          username: [val.transmissionConfig.username],
          password: [val.transmissionConfig.password],
          rpcUrl: [val.transmissionConfig.rpcUrl]
        }),
        folders: this.fb.array([])
      });
      val.folders.forEach(folder => {
        this.folders.push(this.fb.group({
          name: [folder.name],
          path: [folder.path]
        }));
      });
      this.loaded = true;
    });
  }
  get folders() {
    return this.configForm.get('folders') as FormArray;
  }
  public onSubmit() {
    const newConfig: ServerConfig = this.configForm.value as ServerConfig;
    newConfig.folders.forEach( (folder, i) => {
      if (folder.path === '' || folder.name === '') {
        newConfig.folders.splice(i, 1);
      }
    });
    this.configApi.updateServerConfig(newConfig).subscribe( () => {
      this.snackBar.open('Server Configuration Saved', 'Dismiss', {
        duration: 1500
      });
    });
  }
  public pushNewFolder() {
    this.folders.push(this.fb.group( {
          name: [''],
          path: ['']
    }));
  }

}
