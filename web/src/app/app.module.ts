import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { TopicsComponent } from './components/topics/topics.component';
import { NewComponent } from './components/topics/new/new.component';

import { QuillModule } from 'ngx-quill';
import { FileValueAccesorDirective } from 'src/app/directives/file-value-accesor.directive';

@NgModule({
  declarations: [
    AppComponent,
    TopicsComponent,
    NewComponent,
    FileValueAccesorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuillModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
