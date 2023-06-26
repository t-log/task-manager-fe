import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { MyTasksComponent } from '../my-tasks/my-tasks.component';

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { FilterComponent } from '../my-tasks/filter/filter.component';
import { FormsModule } from '@angular/forms';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarComponent,
                      MyTasksComponent,
                      FilterComponent ],
      imports:[HttpClientTestingModule,
               FormsModule
              ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
