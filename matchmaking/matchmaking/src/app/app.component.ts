import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'matchmaking';

  public response : any = [] ;
  constructor(private http: HttpClient){
    this.search();
  }

  search(){
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    this.http.get('http://localhost:8011/', {headers : headers} ).subscribe((response)=>{
      this.response = response;
      
    })
  }
}
