import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'matchmaking';
  fullNameControl : FormGroup;

  public response : any = [] ;
  constructor(private http: HttpClient){
    this.search();
    this.fullNameControl = new FormGroup({
      firstName: new FormControl('',[myV('loler')]),
      secondName: new FormControl()
    })
    this.fullNameControl.valueChanges.subscribe((value) => {console.log(value)})
    this.fullNameControl.statusChanges.subscribe((status) => {console.log(status)})

  }

  search(){
    const headers = new HttpHeaders({'Access-Control-Allow-Origin' : '*'});
    this.http.get('http://localhost:8011/', {headers : headers} ).subscribe((response)=>{
      this.response = response;
      
    })
  }

  ngOnInit(){
    
  }

  
}

function  myV(nameRe : string) : ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = (control.value) == nameRe;
    return forbidden ? {forbiddenName: {value: control.value}} : null;
  };
}