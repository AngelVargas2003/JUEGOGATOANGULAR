import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfacePartidasComponent } from './interface-partidas.component';

describe('InterfacePartidasComponent', () => {
  let component: InterfacePartidasComponent;
  let fixture: ComponentFixture<InterfacePartidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfacePartidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfacePartidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
