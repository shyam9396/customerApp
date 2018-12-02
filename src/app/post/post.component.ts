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
    this.postService.create(post)
    .subscribe(
      newPosts => {
      console.log(newPosts);
      post['id'] = newPosts.id;
      this.posts.splice(0,0, post);
    }, 
    (error:AppError )=> {
      if (error instanceof BadInput){
        //this.form.setErrors(error.originalError); // Form not implimented thats the reason commented
        alert("Bad Request Error")
      }
      else throw error
    })
  }
  updateData(post){
    this.postService.update(post)
    .subscribe(
      updatedPosts => {
      console.log(updatedPosts);
    });
  }
  deleteData(post){
    this.postService.delete(post.id)
    .subscribe(
      () => {
      let index = this.posts.indexOf(post);
      this.posts.splice(index, 1);
      alert("Dleted Item")
    },
    (error: AppError) => {
      if(error instanceof NotFoundError){
        alert("This post already deleted");
      }
      else throw error
    })
  }
  ngOnInit() {
    this.postService.getAll()
    .subscribe(posts => this.posts = posts);
  }
   
}
