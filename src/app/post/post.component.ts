import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service'
import { AppError } from './../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInput } from './../common/bad-input';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: any[];
  // private url = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private postService:PostService) { 
    
  }

  createPost(input:HTMLInputElement){
    let post:any = {title:input.value};
    input.value = '';
    this.postService.createService(post)
    .subscribe(
      response => {
      console.log(response.json());
      post.id = response.json().id;
      this.posts.splice(0,0, post);
    }, 
    (error:AppError )=> {
      if (error instanceof BadInput){
        //this.form.setErrors(error.originalError); // Form not implimented thats the reason commented
        alert("Bad Request Error")
      }
      else{
        alert("Unexpected Error");
        console.log(error);
      }
    })
  }
  updateData(post){
    this.postService.updateService(post)
    .subscribe(
      response => {
      console.log(response.json());
    }, 
    error => {
      alert("Unexpected Error");
      console.log(error);
    })
  }
  deleteData(post){
    this.postService.deleteService(post.id)
    .subscribe(
      response => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      alert("Dlete Item")
    },
    (error: AppError) => {
      if(error instanceof NotFoundError){
        alert("This post already deleted");
      }
      else{
        alert("Unexpected Error");
        console.log(error);
      }
    })
  }
  ngOnInit() {
    this.postService.getService()
    .subscribe(
      response => {
      this.posts = response.json();
    }, 
    error => {
      alert("Unexpected Error");
      console.log(error);
    });
  }
   
}
