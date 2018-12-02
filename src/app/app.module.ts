import { BrowserModule } from '@angular/platform-browser';
import {HttpModule} from '@angular/http'
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { NewCourseFromComponent } from './new-course-from/new-course-from.component';
import { PostComponent } from './post/post.component';
import {PostService} from './services/post.service'
import { AppErrorHandler } from './common/app-error-handler';
@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    NewCourseFromComponent,
    PostComponent
  ],
  imports: [  
  BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    PostService,
    {provide : ErrorHandler, useClass: AppErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
