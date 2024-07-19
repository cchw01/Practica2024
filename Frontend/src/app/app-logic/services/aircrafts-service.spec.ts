import { Component, OnInit } from '@angular/core';
import { AircraftsListMockServices } from './aircrafts-service';
import { AircraftItem } from '../models/aircraft-item';
import { TestBed } from '@angular/core/testing';



describe('AicraftsListMockService', () => {
  let service: AircraftsListMockServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AircraftsListMockServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

