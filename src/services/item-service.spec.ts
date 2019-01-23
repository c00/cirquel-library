import { ApiService } from './api';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EnvironmentBase } from '../environments/environment.base';
import { environment } from '../environments/environment';
import { ItemService } from './item-service';

describe('itemService', () => {
  let itemService: ItemService;
  let api: ApiService;
  let httpMock: HttpTestingController;
  let settings: EnvironmentBase = environment;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        ItemService
      ]
    });

    api = TestBed.get(ApiService);
    itemService = TestBed.get(ItemService);
    httpMock = TestBed.get(HttpTestingController);

  });

  /* Note
  Do request first
  While request is 'waiting', create the mockrequest and flush it.
   */
  it('Should return a value on successful GETs', async (done) => {
    const testUrl = '/';
    
    //First do the request
    api.get(testUrl)
    .then((r) => {
      expect(r.result).toBe('ok');
    });
    
    //Then setup the response
    let sampleRequest = httpMock.expectOne(settings.api + testUrl);
    //Return a successful response
    sampleRequest.flush({ result: "ok" });

    //Verify all responses have been sent/used
    httpMock.verify();

    //Let Jasmine know we're done.
    done();
  });

  /* Note
  Do request first
  While request is 'waiting', create the mockrequest and flush it.
   */
  it('Should return an error on unsuccessful GETs', async (done) => {
    const testUrl = '/';
    
    //First do the request
    api.get(testUrl)
    .catch((err) => {
      expect(err.status).toBe(500);
    });
    
    //Then setup the response
    let sampleRequest = httpMock.expectOne(settings.api + testUrl);
    //Return a successful response
    sampleRequest.error(new ErrorEvent('GENERIC_ERROR'),{ status: 500 });

    //Verify all responses have been sent/used
    httpMock.verify();

    //Let Jasmine know we're done.
    done();
  });

  it ('should get some items', async (done) => {
    
    itemService.getItems(0)
    .then(result => {
      expect(result.length).toBe(3);
    });

    const url = settings.api + "items?page=0&limit=10";
    let itemRequest = httpMock.expectOne(url);

    //give better results, this makes now sense.
    itemRequest.flush([{}]);

    httpMock.verify();
    done();
  });

  //todo test urlBuilder
  //todo test the events searchComplete on search completion.


});