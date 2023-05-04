import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  filterFlag : boolean;

  constructor(private http:HttpClient) { 
    this.filterFlag = false;
  }

  getFilterFlag(){
    return this.filterFlag;
  }

  setFilterFlag(val : boolean){
    this.filterFlag = val;
  }


  getPatientTasksData = ()=> {return this.http.get("http://localhost:8080/view?filter="+this.filterFlag)};   //view all patient details along with the tasks

  // filterPatientTasks=(filterOptionsData:any)=>{return this.http.post("http://localhost:8080/filter",filterOptionsData)}

  filterPatientTasks=(filterOptionsData:any)=>{return this.http.post("http://localhost:8080/view?filter="+this.filterFlag,filterOptionsData)}

}
