import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServerConfigService } from '../server-config.service';
import { ServerConfig } from '../serverconfig';

@Component({
  selector: 'app-server-config',
  templateUrl: './server-config.component.html',
  styleUrls: ['./server-config.component.scss']
})
export class ServerConfigComponent implements OnInit {
  configForm = new FormGroup({
    rpcUrl : new FormControl(''),
    requiresAuth : new FormControl(false),
    username : new FormControl(''),
    password : new FormControl(''),
    movieDirectory : new FormControl(''),
    tvDirectory : new FormControl(''),
  });
  public loaded = false;
  constructor(private configApi: ServerConfigService) { }

  ngOnInit() {
    this.configApi.getServerConfig().subscribe(val => {
      this.configForm.setValue({
        rpcUrl: val.transmissionConfig.rpcUrl,
        requiresAuth: val.transmissionConfig.requiresAuth,
        username: val.transmissionConfig.username,
        password: val.transmissionConfig.password,
        movieDirectory: val.moviesFolder,
        tvDirectory: val.tvShowsFolder
      });
      this.loaded = true;
    });
  }
  public onSubmit() {
    const newConfig: ServerConfig = {
      transmissionConfig: {
        rpcUrl: this.configForm.get('rpcUrl').value,
        requiresAuth: this.configForm.get('requiresAuth').value,
        username: this.configForm.get('username').value,
        password: this.configForm.get('password').value
      },
      moviesFolder: this.configForm.get('movieDirectory').value,
      tvShowsFolder: this.configForm.get('tvDirectory').value
    };
    this.configApi.updateServerConfig(newConfig).subscribe();
  }

}
