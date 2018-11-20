import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { EnvironmentBase } from '../environments/environment.base';

@Injectable()
export class ApiService {
  settings: EnvironmentBase = environment;
  headers = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
  }

  public setToken(token: string) {
    this.headers = this.headers.append('X-Auth-Token', token);
  }
  
  public get(path: string): Promise<any> {
    return this.http.get(this.settings.api + path, { headers: this.headers })
    .toPromise()
    .catch(err => {
      console.error(err);
      throw new Error(err);
    });
  }

  public put(path: string, body: any): Promise<any> {
    return this.http.put(this.settings.api + path, body, { headers: this.headers })
    .toPromise()
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });    
  }

  public post(path: string, body: any): Promise<any> {
    return this.http.post(this.settings.api + path, body, { headers: this.headers })
    .toPromise()
    .catch((err) => {
      console.error(err);
      throw new Error(err);
    });    
  }
  
}


