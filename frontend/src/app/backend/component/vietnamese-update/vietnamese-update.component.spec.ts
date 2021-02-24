import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VietnameseUpdateComponent } from './vietnamese-update.component';

describe('VietnameseUpdateComponent', () => {
  let component: VietnameseUpdateComponent;
  let fixture: ComponentFixture<VietnameseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VietnameseUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VietnameseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
