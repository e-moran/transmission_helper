export interface SearchResult {
    status: string;
    results: Result[];
}

export class Result {
    name: string;
    seeds: number;
    leeches: number;
    size: string;
    url: string;
    provider: string;
    clicked = false;
}

export interface MagnetResult {
    response: string;
    magnetUrl: string;
}
