import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  filterRevealFlag : boolean = false;

  onClickFilterButton(){
    this.filterRevealFlag = !this.filterRevealFlag;
  }
}
