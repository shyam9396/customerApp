import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/observable';
import 'rxjs/add/operator/catch';
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
    return this.http.post(this.url, JSON.stringify(post));
  }
  updateService(post){
    return this.http.patch(this.url + '/' + post.id, JSON.stringify({isRead:true}));
   // return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }
  deleteService(id){
    return this.http.delete(this.url + '/' + id)
    .catch((error: Response) => {
      Observable.throw();
      
    });
  }

}
