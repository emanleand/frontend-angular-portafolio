import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService {
    public url: string;

    constructor(private _http: HttpClient) {        
        this.url = Global.url;
    }

    testService() {
        return 'check service';
    }
    
    saveProject(project: Project): Observable<any> {
        let params = JSON.stringify(project);
        console.log(params)
        let headers = new HttpHeaders({
            'Content-type': 'application/json'
        });

        return this._http.post(this.url + 'save-project', params, {headers:headers});
    }
}