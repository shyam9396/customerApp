import { AppError } from './../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'
// import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http:Http) { 

  }
  getService(){
    return this.http.get(this.url)
    .catch(this.errorHandling);
  }
  
  createService(post){
    return this.http.post(this.url, JSON.stringify(post))
    .catch(this.errorHandling)
  }
  updateService(post){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead:true}))
    .catch(this.errorHandling);
   // return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }
  deleteService(id){
    return this.http.delete(this.url + '/' + id)
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
