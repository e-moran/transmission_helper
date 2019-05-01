export interface TorrentStatusResponse {
    arguments: TorrentStatusArguments;
    result: string;
}

export interface TorrentStatus {
    eta: number;
    id: number;
    percentDone: number;
    name: string;
    status: number;
}

export interface TorrentStatusArguments {
    torrents: TorrentStatus[];
}

export interface FreeSpaceResponse {
    arguments: FreeSpaceArguments;
    result: string;
}

export interface FreeSpaceArguments {
    path: string;
    sizeBytes: number;
}
