import { Component, Input } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {

  patientData: any = [];

  @Input() taskRevealFlagChild: boolean = false;

  receivedFilterData: any = [];  //filter Options

  constructor(private api: ApiService) {
      api.getPatientTasksData().subscribe(
        (response) => {
          this.patientData = response;
          // console.log(this.patientData);  
        }
      )
    
  }

  receivedData(data : any){

    this.receivedFilterData = data;
    console.log("Filter Options")
    console.log(this.receivedFilterData);
    
    this.api.filterPatientTasks(this.receivedFilterData).subscribe(
        (response:any)=>{

          if(response.length == 0)
          {
            alert("No matching records found!") 
          }
            
          else{
            console.log("Filter end point response"+JSON.stringify(response));
            this.patientData = response;
            console.log(this.patientData);
          }          
          // this.filteredResponseEvent.emit(response);
          
          // console.log("The response bounced back is"+ JSON.stringify(response));
          
          
        }
      )
  }

  resetTable(data : any){
    this.patientData = data;
  }

}
