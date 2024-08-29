import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactFormFieldComponent } from './contact-form-field.component';

describe('ContactFormFieldComponent', () => {
  let component: ContactFormFieldComponent;
  let fixture: ComponentFixture<ContactFormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactFormFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
