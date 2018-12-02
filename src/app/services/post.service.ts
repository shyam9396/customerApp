import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import { AppError } from './../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from '../common/bad-input';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://jsonplaceholder.typicode.com/posts';
  constructor(private http:Http) { 

  }
  getService(){
    return this.http.get(this.url);
  }
  
  createService(post){
    return this.http.post(this.url, JSON.stringify(post))
    .catch((error: Response) => {
      if(error.status === 400){
        return Observable.throw(new BadInput(error.json()))
      }
      else{
        return Observable.throw(new AppError(error.json()))
      }
    })
  }
  updateService(post){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead:true}));
   // return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }
  deleteService(id){
    return this.http.delete(this.url + '/' + id)
    .catch((error: Response) => {
      if(error.status === 404){
        return Observable.throw(new NotFoundError(error.json()));
        
      }
     return Observable.throw(new AppError(error.json()));
      
    });
  }

}
