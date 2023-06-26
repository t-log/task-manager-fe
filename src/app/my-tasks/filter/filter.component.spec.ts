import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import {of} from 'rxjs';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let apiService : ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
               FormsModule],
      declarations: [ FilterComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);


    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should update priorityHigh correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updatePriorityHigh(falseEvent);
    expect(component.priorityHigh['high']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updatePriorityHigh(trueEvent);
    expect(component.priorityHigh['high']).toEqual(true);
  });

  it('should update priorityMedium correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updatePriorityMedium(falseEvent);
    expect(component.priorityMedium['medium']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updatePriorityMedium(trueEvent);
    expect(component.priorityMedium['medium']).toEqual(true);
  });

  it('should update priorityLow correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updatePriorityLow(falseEvent);
    expect(component.priorityLow['low']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updatePriorityLow(trueEvent);
    expect(component.priorityLow['low']).toEqual(true);
  });

  it('should update StatusNotStarted correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updateStatusNotStarted(falseEvent);
    expect(component.statusNotStarted['not started']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updateStatusNotStarted(trueEvent);
    expect(component.statusNotStarted['not started']).toEqual(true);
  });

  it('should update StatusOnHold correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updateStatusOnHold(falseEvent);
    expect(component.statusOnHold['on hold']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updateStatusOnHold(trueEvent);
    expect(component.statusOnHold['on hold']).toEqual(true);
  });

  it('should update InProgress correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updateStatusInProgress(falseEvent);
    expect(component.statusInProgress['in progress']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updateStatusInProgress(trueEvent);
    expect(component.statusInProgress['in progress']).toEqual(true);
  });

  it('should update Completed correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updateStatusCompleted(falseEvent);
    expect(component.statusCompleted['completed']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updateStatusCompleted(trueEvent);
    expect(component.statusCompleted['completed']).toEqual(true);
  });

  it('should update Overdue correctly', () => {
    let falseEvent = {"target":{"checked":false}}
    component.updateStatusOverdue(falseEvent);
    expect(component.statusOverdue['over due']).toEqual(false);
    let trueEvent = {"target":{"checked":true}}
    component.updateStatusOverdue(trueEvent);
    expect(component.statusOverdue['over due']).toEqual(true);
  });

  it('should toggle filterRevealFlag correctly', () => {
    expect(component.filterRevealFlag).toBe(false);
    component.onClickFilterButton();
    expect(component.filterRevealFlag).toBe(true);
    component.onClickFilterButton();
    expect(component.filterRevealFlag).toBe(false);
  });

  it(`should call apiService.setFilterFlag() with true 
      and emit filterData when onClickApply() is called`, ()=>{

        spyOn(apiService, 'setFilterFlag');
        const filterData = { 
          priority: [{"high":true},{"high":true},{"high":true}], 
          status: [{'not started':false},{'not started':false},{'not started':false},{'not started':false},{'not started':false}], 
          preset: 0 
        };
        component.priority = filterData.priority;
        component.status = filterData.status;
        component.preset = filterData.preset;
        spyOn(component.filteredEvent, 'emit');

        component.onClickApply();

        expect(apiService.setFilterFlag).toHaveBeenCalledWith(true);
        expect(component.filteredEvent.emit).toHaveBeenCalledWith(filterData);

      })

      it('should reset filter options and emit reset event', () => {
        const mockResponse = { 
          priority: [{"high":false},{"high":false},{"high":false}], 
          status: [{'not started':false},{'not started':false},{'not started':false},{'not started':false},{'not started':false}], 
          preset: 0 
        };;

        spyOn(apiService, 'getPatientTasksData').and.returnValue(of(mockResponse));
        spyOn(component.resetEvent, 'emit');

        component.onClickReset();
    
        expect(component.priorityHigh).toEqual({ 'high': false });
        expect(component.priorityMedium).toEqual({ 'medium': false });
        expect(component.priorityLow).toEqual({ 'low': false });
        expect(component.statusNotStarted).toEqual({ 'not started': false });
        expect(component.statusOnHold).toEqual({ 'on hold': false });
        expect(component.statusInProgress).toEqual({ 'in progress': false });
        expect(component.statusCompleted).toEqual({ 'completed': false });
        expect(component.statusOverdue).toEqual({ 'over due': false });
        expect(component.preset).toEqual(0);

        expect(apiService.getPatientTasksData).toHaveBeenCalled();
        expect(component.resetEvent.emit).toHaveBeenCalledWith(mockResponse);

        expect(component.priority).toEqual([component.priorityHigh, component.priorityMedium, component.priorityLow]);
        expect(component.status).toEqual([component.statusNotStarted, component.statusOnHold, component.statusInProgress, component.statusCompleted, component.statusOverdue]);

      });

});
