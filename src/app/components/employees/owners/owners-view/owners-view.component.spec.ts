import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersViewComponent } from './owners-view.component';

describe('OwnersViewComponent', () => {
  let component: OwnersViewComponent;
  let fixture: ComponentFixture<OwnersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnersViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
