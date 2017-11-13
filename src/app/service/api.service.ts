import {RequestOptions, Http, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import { User } from '../class/User';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
    private url:string = "http://localhost:8888/Angular/heroclicker/APIHC/";
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 
                                     'Accept': 'q=0.8;application/json;q=0.9' });
        this.options = new RequestOptions({ headers: this.headers });
        this.http = http
    }

    
    
    getAllObject(): Promise<any> {
        return this.http.get(this.url+'objects').toPromise();
    }
    getObjectById(id:number):Promise<any> {
        return this.http.get(this.url+'object/'+id).toPromise();
    }

    getAllFriend(): Promise<any> {
        return this.http.get(this.url+'friends').toPromise();
    }
    getFriendById(id:number):Promise<any> {
        return this.http.get(this.url+'friend/'+id).toPromise();
    }
    
    postLogIn(user:User): Promise<any>{
        let userapi= {username: user.getUsername(), password: user.getPassword()}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'login',body,this.options).toPromise();
    }
    postSignin(user): Promise<any>{
        let userapi= {username: user.getUsername(), password: user.getPassword()}
        let body = JSON.stringify(userapi);
        return this.http.post(this.url+'signin',body).toPromise();
    }
    goldUser(id:number, gold): Promise<any>{
        const body = {gold: gold};
        return this.http.post(this.url+'usergold/'+id,body).toPromise();
    }
    getMyObjectById(id){
        let ids= {id : id}
        let body = JSON.stringify(ids);
        return this.http.post(this.url+'myobjects',body).toPromise();
    }
    getMyFriendById(id){
        let ids= {id : id}
        let body = JSON.stringify(ids);
        return this.http.post(this.url+'myfriends',body).toPromise();
    }
}