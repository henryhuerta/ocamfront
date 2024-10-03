import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class Config {
    data: string;
    auth: string;
    payment: string;
    operation: string;
    document: string;
    report: string;
    video: string;
}

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    config: Config;

    constructor(private http: HttpClient) { }

    loadConfig() {
        return this.http
            .get<Config>('./assets/config.json')
            .subscribe((config: Config) => {
                this.config = config;
            });
    }
}
