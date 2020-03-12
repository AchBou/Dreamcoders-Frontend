import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String;
  isCollapsed = false;

  constructor(){

  }
  public setTitle(t:String){
    this.title = t;
  }
}
