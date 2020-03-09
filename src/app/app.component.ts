import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: String;
  isCollapsed = false;
  constructor(router: Router){
    
  }
  public setTitle(t:String){
    this.title = t;
  }
}
