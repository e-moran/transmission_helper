export interface SearchResult {
    status: string;
    results: Result[];
}

export interface Result {
    name: string;
    seeds: number;
    leeches: number;
    size: string;
    url: string;
    provider: string;
}
