import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Collection } from '../utils/interface/Collection';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get collections ',()=>{
    expect(service.getCollections()).toBeInstanceOf(Promise<Collection[]>);
    
  })
});
