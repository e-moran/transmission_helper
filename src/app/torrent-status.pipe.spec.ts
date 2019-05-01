import { TorrentStatusPipe } from './torrent-status.pipe';

describe('TorrentStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new TorrentStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
