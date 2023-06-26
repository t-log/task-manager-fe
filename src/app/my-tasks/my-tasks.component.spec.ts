import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTasksComponent } from './my-tasks.component';

import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FilterComponent } from './filter/filter.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api.service';
import {of} from 'rxjs';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,
               FormsModule  
              ],
      declarations: [ MyTasksComponent,
                      FilterComponent,
                       
                    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set patientData with response received from getPatientTAsksData()',()=>{

    const mockResponse = { 
      priority: [{"high":false},{"high":false},{"high":false}], 
      status: [{'not started':false},{'not started':false},{'not started':false},{'not started':false},{'not started':false}], 
      preset: 0 
    };;

    spyOn(apiService, 'getPatientTasksData').and.returnValue(of(mockResponse));

  })

});
