import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VietnameseCreateComponent } from './vietnamese-create.component';

describe('VietnameseCreateComponent', () => {
  let component: VietnameseCreateComponent;
  let fixture: ComponentFixture<VietnameseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VietnameseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VietnameseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
