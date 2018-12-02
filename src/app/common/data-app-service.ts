import { AppError } from './../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'
// import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private url:string, private http:Http) { 

  }
  getAll(){
    return this.http.get(this.url)
    .map(response => response.json())
    .catch(this.errorHandling);
  }
  
  create(resourse){
    return this.http.post(this.url, JSON.stringify(resourse))
    .map(response => response.json())
    .catch(this.errorHandling)
  }
  update(resourse){
    return this.http.patch(this.url + '/' + resourse.id, JSON.stringify({isRead:true}))
    .map(response => response.json())
    .catch(this.errorHandling);
   // return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }
  delete(id){
    return this.http.delete(this.url + '/' + id)
    .map(response => response.json())
    .catch(this.errorHandling);
  }

  private errorHandling(error: Response){
    if(error.status === 400){
      return Observable.throw(new BadInput(error.json()))
    }
    if(error.status === 404){
      return Observable.throw(new NotFoundError(error.json()));
      
    }
   return Observable.throw(new AppError(error.json()));
  }

}
