import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Hero } from "./hero";
import * as http from "http";

describe('HeroService', () => {
  let mockMessageService;
  let service: HeroService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    })

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  })

  describe('getHero', () => {
    it('should call get with the correct URL',() => {
      // call getHero()
      service.getHero(4).subscribe();

      const req = httpTestingController.expectOne('api/heroes/4')

      req.flush({id: 4, name: 'SuperDude', strength: 100})
      expect(req.request.method).toBe('GET');
      httpTestingController.verify();
    })
  })
})
