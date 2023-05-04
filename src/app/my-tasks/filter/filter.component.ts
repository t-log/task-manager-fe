import { Component, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private api:ApiService){}

  filterRevealFlag : boolean = false;

  priorityHigh:{[key:string] : boolean} = {'high':false};
  priorityMedium:{[key:string] : boolean} = {'medium':false};
  priorityLow:{[key:string] : boolean} = {'low':false};

  statusNotStarted:{[key:string] : boolean} = {'not started':false};
  statusOnHold:{[key:string] : boolean} = {'on hold':false};
  statusInProgress:{[key:string] : boolean} = {'in progress':false};
  statusCompleted:{[key:string] : boolean} = {'completed':false};
  statusOverdue:{[key:string] : boolean} = {'overdue':false};

  priority = [this.priorityHigh,this.priorityMedium,this.priorityLow];
  status = [this.statusNotStarted,this.statusOnHold,this.statusInProgress,this.statusCompleted,this.statusOverdue];
  preset :{[key:string]: string} = {'preset': 'none'};

  updatePriorityHigh(event: Event) {
    // const newValue = (event.target as HTMLInputElement);
    this.priorityHigh['high'] = event ? true : false;
    // console.log(this.priorityHigh);  
  }
  updatePriorityMedium(event: Event) {
    // const newValue = JSON.stringify(event); 
    this.priorityMedium['medium'] = event ? true : false;
    // console.log(this.priorityMedium);  
  }
  updatePriorityLow(event: Event) {
    this.priorityLow['low'] = event ? true : false;
  }

  updateStatusNotStarted(event: Event){
    this.statusNotStarted['not started'] = event ? true : false;
  }
  updateStatusOnHold(event: Event){
    this.statusOnHold['on hold'] = event ? true : false;
  }
  updateStatusInProgress(event: Event){
    this.statusInProgress['in progress'] = event ? true : false;
  }
  updateStatusCompleted(event: Event){
    this.statusCompleted['completed'] = event ? true : false;
  }
  updateStatusOverdue(event: Event){
    this.statusOverdue['overdue'] = event ? true : false;
  }
  

  onClickFilterButton(){
    this.filterRevealFlag = !this.filterRevealFlag;
  }

  onClickApply(){
    this.preset = this.preset;
    // console.log("Value of preset"+ this.preset);
    
    let filterData:any = {priority:this.priority,status:this.status,preset:this.preset};
    // console.log(filterData);

    this.api.filterPatientTasks(filterData).subscribe(
      (response:any)=>{
        // console.log("The response bounced back is"+ JSON.stringify(response));
        // if(response.status=="success")
        // {
        //   alert("") 
        // }
          
        // else{
        //   alert("")
        // }
        
      }
    )
    



  }

  onClickReset(){
    this.priorityHigh = {'high':false};
    this.priorityMedium = {'medium':false};
    this.priorityLow = {'low':false};

    this.statusNotStarted = {'not started':false};
    this.statusOnHold = {'on hold':false};
    this.statusInProgress = {'in progress':false};
    this.statusCompleted = {'completed':false};
    this.statusOverdue = {'overdue':false};


    this.preset  = {'preset': 'none'};

  }

}
