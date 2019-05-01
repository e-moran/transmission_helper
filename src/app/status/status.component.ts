import { Component, OnInit } from '@angular/core';
import { TransmissionService } from '../transmission.service';
import { ServerConfigService } from '../server-config.service';
import { TorrentStatus } from '../transmission-response';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public torrents: TorrentStatus[];

  constructor(private transmissionApi: TransmissionService, private configService: ServerConfigService) { }

  ngOnInit() {
    this.refreshData();
    setInterval(() => {
      this.refreshData();
    }, 500);
  }
  refreshData() {
    this.configService.getServerConfig().subscribe( config => {
      this.transmissionApi.getStatus(config).subscribe( results => {
        this.torrents = results;
      });
    });
  }
  deleteTorrent(id: number) {
    this.configService.getServerConfig().subscribe( config => {
      this.transmissionApi.deleteTorrent(id, config).subscribe(() => {
        this.refreshData();
      });
    });
  }
}
