import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {

  patientData:any = [];

  @Input() taskRevealFlagChild : boolean = false;
  
  constructor(private api:ApiService){
    api.getPatientData().subscribe(
      (response)=>
      {
      this.patientData = response;
      console.log(this.patientData);  
      }
      )
  }
  
}
