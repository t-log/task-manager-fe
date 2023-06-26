import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor(private api:ApiService){}

  filterRevealFlag : boolean = false;

  @Output() filteredEvent = new EventEmitter<any>() ;

  @Output() resetEvent = new EventEmitter<any>();


  priorityHigh:{[key:string] : boolean} = {'high':false};
  priorityMedium:{[key:string] : boolean} = {'medium':false};
  priorityLow:{[key:string] : boolean} = {'low':false};

  statusNotStarted:{[key:string] : boolean} = {'not started':false};
  statusOnHold:{[key:string] : boolean} = {'on hold':false};
  statusInProgress:{[key:string] : boolean} = {'in progress':false};
  statusCompleted:{[key:string] : boolean} = {'completed':false};
  statusOverdue:{[key:string] : boolean} = {'over due':false};

  priority = [this.priorityHigh,this.priorityMedium,this.priorityLow];
  status = [this.statusNotStarted,this.statusOnHold,this.statusInProgress,this.statusCompleted,this.statusOverdue];
  preset :number = 0;

  updatePriorityHigh(event: any) {
    // const newValue = (event.target as HTMLInputElement);
    // console.log("high event%");
    // console.log(event.target.checked);
    this.priorityHigh['high'] = event.target.checked;
    // console.log(this.priorityHigh);  
  }
  updatePriorityMedium(event: any) {
    // const newValue = JSON.stringify(event); 
    this.priorityMedium['medium'] = event.target.checked;
    // console.log(this.priorityMedium);  
  }
  updatePriorityLow(event: any) {
    this.priorityLow['low'] = event.target.checked;
  }

  updateStatusNotStarted(event: any){
    this.statusNotStarted['not started'] = event.target.checked;
  }
  updateStatusOnHold(event: any){
    this.statusOnHold['on hold'] = event.target.checked;
  }
  updateStatusInProgress(event: any){
    this.statusInProgress['in progress'] = event.target.checked;
  }
  updateStatusCompleted(event: any){
    this.statusCompleted['completed'] = event.target.checked;
  }
  updateStatusOverdue(event: any){
    this.statusOverdue['over due'] = event.target.checked;
  }
  

  onClickFilterButton(){
    this.filterRevealFlag = !this.filterRevealFlag;
  }

  onClickApply(){

    //Updating filterFlag (filterFlag is a global varible in service.ts) to true so when apply is clicked the value of api link should be /view?filter=true
    this.api.setFilterFlag(true);
        
    let filterData = {priority:this.priority,status:this.status,preset:this.preset};
    console.log("Data format sent from Front End is "+JSON.stringify(filterData));

    this.filteredEvent.emit(filterData);

  }

  onClickReset(){
    console.log("Rest button clicked");
    
    this.priorityHigh = {'high':false};
    this.priorityMedium = {'medium':false};
    this.priorityLow = {'low':false};

    this.statusNotStarted = {'not started':false};
    this.statusOnHold = {'on hold':false};
    this.statusInProgress = {'in progress':false};
    this.statusCompleted = {'completed':false};
    this.statusOverdue = {'over due':false};

    this.preset  = 0;

    this.api.setFilterFlag(false);

    this.api.getPatientTasksData().subscribe(
      (response) => {
        this.resetEvent.emit(response);
        // console.log("from reset");
        this.priority = [this.priorityHigh,this.priorityMedium,this.priorityLow];
        this.status = [this.statusNotStarted,this.statusOnHold,this.statusInProgress,this.statusCompleted,this.statusOverdue];
        console.log("Hello the response is"+response);
        
      }     
    )    

    // window.location.reload();
  }
}
