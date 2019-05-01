export interface ServerConfigResponse {
    response: string;
    conf: ServerConfig;
}

export interface ServerConfig {
    transmissionConfig: TransmissionConfig;
    folders: FilmType[];
}

export interface TransmissionConfig {
    requiresAuth: boolean;
    username: string;
    password: string;
    rpcUrl: string;
}

export interface FilmType {
    name: string;
    path: string;
    freeSpace: number;
}
