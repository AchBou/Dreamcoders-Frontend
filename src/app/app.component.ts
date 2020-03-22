import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  private title: String;
  isCollapsed = false;
  constructor(){
    
  }
  ngOnInit(){
    setTimeout(()=>{  
      this.isCollapsed = true  
  })  
  }
  public setTitle(t:String){
    this.title = t;
  }
}
