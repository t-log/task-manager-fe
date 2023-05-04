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
    this.statusOverdue['over due'] = event ? true : false;
  }
  

  onClickFilterButton(){
    this.filterRevealFlag = !this.filterRevealFlag;
  }

  onClickApply(){

    //Updating filterFlag (filterFlag is a global varible in service.ts) to true so when apply is clicked the value of api link should be /view?filter=true
    this.api.setFilterFlag(true);

    // this.preset = this.preset;

    // console.log("Value of preset"+ this.preset);
    
    let filterData = {priority:this.priority,status:this.status,preset:this.preset};
    console.log("Data format sent from Front End is "+JSON.stringify(filterData));

    this.filteredEvent.emit(filterData);

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


    this.preset  = 0;


    this.api.setFilterFlag(false);

    this.api.getPatientTasksData().subscribe(
      (response) => {
        // this.patientData = response;
        // console.log(this.patientData);
        this.resetEvent.emit(response);
        
        console.log("Hello"+response);
        
      }
      
    )
    

  }

}
