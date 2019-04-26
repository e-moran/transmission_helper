export interface ServerConfig {
    transmissionConfig: TransmissionConfig;
    moviesFolder: string;
    tvShowsFolder: string;
}

export interface TransmissionConfig {
    requiresAuth: boolean;
    username: string;
    password: string;
    rpcUrl: string;
}
