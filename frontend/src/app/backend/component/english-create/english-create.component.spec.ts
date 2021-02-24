import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnglishCreateComponent } from './english-create.component';

describe('EnglishCreateComponent', () => {
  let component: EnglishCreateComponent;
  let fixture: ComponentFixture<EnglishCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnglishCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnglishCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
