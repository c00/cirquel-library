import { Component, OnInit, Input, ViewChild, ElementRef, NgZone, ViewEncapsulation } from '@angular/core';
import { VideoResource } from '../../model/Resources';
import { ResourceService } from '../../../services/resource-service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoPlayerComponent implements OnInit {
  @Input() resource: VideoResource;
  @ViewChild('video') videoRef: ElementRef;
  videoEl: HTMLVideoElement;
  shakaPlayer; //Shaka Player, for playing DASH (no IOS)
  //Statuses
  buffering = true;
  state = 'not-started'; //not-started buffering, playing, paused, ended
  bufferTimeout;
  progress = 0;
  duration: number;
  current = 0;
  seekState = {
    wasPaused: false,
    startTime: 0
  };
  preloaded = true;

  constructor(
    private rs: ResourceService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.videoEl = this.videoRef.nativeElement;
    
    this.setupPlayerEvents();

    if (this.rs.canPlayHls){
      this.setupHls();
    } else {
      this.setupShaka();
    }
  }

  private setupPlayerEvents() {
    this.videoEl.addEventListener('playing', () => {
      this.zone.run(() => {
        this.bufferTimeout = setTimeout(() => {
          this.buffering = false;
          this.state = 'playing'
        }, 300);
      });
    });
    this.videoEl.addEventListener('waiting', () => {
      this.zone.run(() => {
        this.buffering = true;
        if (this.bufferTimeout) clearTimeout(this.bufferTimeout);
        this.state = 'buffering';
      });
    });
    this.videoEl.addEventListener('ended', () => {
      this.zone.run(() => {
        this.state = 'ended';
      });
    });
    this.videoEl.addEventListener('timeupdate', (e) => {
      this.zone.run(() => {
        if (!this.duration) return;
        this.updateSeeker(this.videoEl.currentTime);
      });
    });

    this.videoEl.addEventListener('loadedmetadata', (e) => {
      this.zone.run(() => {
        this.progress = (this.videoEl.currentTime / this.videoEl.duration) * 100;
        this.duration = this.videoEl.duration;
      });
    });
  }

  private setupHls() {
    var source = document.createElement('source');

    source.src = this.resource.hlsUri;
    source.type = "application/x-mpegURL";

    this.preloaded = true;

    this.videoEl.appendChild(source);
  }

  private setupShaka() {
    //Setup Shaka for playing HLS and DASH
    return this.rs.ready().then(shaka => {
      // Create a Shaka Player instance.
      this.shakaPlayer = new shaka.Player(this.videoEl);
      
      // Listen for error events.
      this.shakaPlayer.addEventListener('error', (err) => console.error(err));
      return shaka;
    })
    .then(() => {
      //Load video
      return this.loadDashURi();
    })
    .catch((err) => {
      console.error(err);
    });
  }

  private updateSeeker(newTime: number) {
    this.progress = (newTime / this.duration) * 100;
    this.current = newTime;
  }

  private loadDashURi(){
    return this.shakaPlayer.load(this.resource.dashUri);
  }

  public togglePlay() {
    //Start loading the video if we hadn't.
    if (!this.preloaded) {
      this.preloaded = true;
      this.state = 'buffering';
      this.loadDashURi()
      .then(() => {
        this.videoEl.play();
      });
      
    } else if (this.videoEl.paused) {
      this.videoEl.play();
      this.state = 'playing';
    } else {
      this.videoEl.pause();
      this.state = 'paused';
    }

    console.log(this.state);
  }

}
