import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadCtaComponent } from './download-cta.component';

describe('DownloadCtaComponent', () => {
  let component: DownloadCtaComponent;
  let fixture: ComponentFixture<DownloadCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
