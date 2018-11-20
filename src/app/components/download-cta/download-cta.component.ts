import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-download-cta',
  templateUrl: './download-cta.component.html',
  styleUrls: ['./download-cta.component.scss']
})
export class DownloadCtaComponent implements OnInit {

  @Input() vertical = false;

  constructor() { }

  ngOnInit() {
  }

}
