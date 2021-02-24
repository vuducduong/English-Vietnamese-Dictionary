import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishUpdateComponent } from './english-update.component';

describe('EnglishUpdateComponent', () => {
  let component: EnglishUpdateComponent;
  let fixture: ComponentFixture<EnglishUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
