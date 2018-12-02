import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-course-from',
  templateUrl: './new-course-from.component.html',
  styleUrls: ['./new-course-from.component.scss']
})
export class NewCourseFromComponent implements OnInit {

   constructor() { }

   form = new FormGroup({
    topics: new FormArray([])
  });
  get topics(){
    return this.form.get('topics') as FormArray;
  }
  addTopics(topic: HTMLInputElement){
    // ( this.form.get('topics') as FormArray ).push(new FormControl(topic.value));
    this.topics.push(new FormControl(topic.value));
    topic.value = "";

  } 

  removeTopic(topic: FormControl){
    let index = this.topics.controls.indexOf(topic);
    //let index =( this.form.get('topics') as FormArray ).controls.indexOf(topic);
    this.topics.removeAt(index);
  }

  ngOnInit() {
  }

}
