import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsNavbarComponent } from './clients-navbar.component';

describe('ClientsNavbarComponent', () => {
  let component: ClientsNavbarComponent;
  let fixture: ComponentFixture<ClientsNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
