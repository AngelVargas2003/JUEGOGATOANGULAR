import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartidanewComponent } from './partidanew.component';

describe('PartidanewComponent', () => {
  let component: PartidanewComponent;
  let fixture: ComponentFixture<PartidanewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartidanewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartidanewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
