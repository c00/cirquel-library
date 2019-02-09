import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DialogService } from '../../../services/dialog-service';
import { Route, ActivatedRoute } from '@angular/router';
import { MetaService } from '../../../services/meta-service';

@Component({
  selector: 'app-guidelines',
  templateUrl: './guidelines.component.html',
  styleUrls: ['./guidelines.component.scss']
})
export class GuidelinesComponent implements OnInit, AfterViewChecked {
  fragment: string = '';
  @ViewChild('faq') faq: ElementRef;
  scrolled = false;

  constructor(
    private dialogs: DialogService,
    private route: ActivatedRoute,
    private meta: MetaService,
  ) { 
    this.meta.setPageInfo({ title: "Posting Guidelines and FAQ - Cirquel" });
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  ngAfterViewChecked() {
    try {
      if (!this.scrolled && this.fragment && this.fragment === 'faq') {
        setTimeout(() => {
          this.faq.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          this.scrolled = true;
        }, 500);
        
      }
    } catch (e) { }
  }

  public send() {
    this.dialogs.showMessageModal();
  }

}
