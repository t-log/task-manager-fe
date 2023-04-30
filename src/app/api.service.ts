import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getPatientTasksData = ()=> {return this.http.get("http://localhost:8080/view")};   //view all patient details along with the tasks

  filterPatientTasks=(filterOptionsData:any)=>{return this.http.post("http://localhost:8080/filter",filterOptionsData)}

}
