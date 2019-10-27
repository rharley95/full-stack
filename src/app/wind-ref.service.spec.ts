import { TestBed } from '@angular/core/testing';

import { WindRefService } from './wind-ref.service';

describe('WindRefService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindRefService = TestBed.get(WindRefService);
    expect(service).toBeTruthy();
  });
});
