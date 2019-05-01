import {Pipe, PipeTransform} from '@angular/core';
import {TorrentStatus} from './torrent-status.enum';

@Pipe({
  name: 'torrentStatus'
})
export class TorrentStatusPipe implements PipeTransform {

  transform(value: TorrentStatus): any {
    if (value === TorrentStatus.DOWNLOAD || value === TorrentStatus.DOWNLOAD_WAIT) {
      return 'Downloading';
    } else {
      return 'Downloaded';
    }
  }

}
