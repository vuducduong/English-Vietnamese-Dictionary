import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VietnameseListComponent } from './vietnamese-list.component';

describe('VietnameseListComponent', () => {
  let component: VietnameseListComponent;
  let fixture: ComponentFixture<VietnameseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VietnameseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VietnameseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
