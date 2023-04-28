import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getPatientData = ()=> {return this.http.get("http://localhost:8080/view")};   //view all patient details along with the tasks

}
