import { Injectable } from '@angular/core';

declare var shaka;

@Injectable()
export class ResourceService {
  
  private shaka;
  private shakaPromise: Promise<any>;
  private browserSupported: boolean;
  public canPlayHls = false; //todo fix this check
  
  constructor(
    
  ) {
    
    // Shaka does not work on IOS / Safari, as Apple doesn't support DASH.
    // So let's not bother.    
    if (!this.canPlayHls) {
      this.shakaPromise = new Promise((resolve, reject) => {
        if (document.readyState === "complete") {
          resolve(this.setupShaka());
        } else {
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'complete'){
              resolve(this.setupShaka());   
            }
          });
        }
        
      });
    } else {
      this.shakaPromise = Promise.resolve();
    }
  }
  
  private setupShaka() {
    return new Promise((resolve, reject) => {      
      if (!shaka) {
        console.error("No Shaka");
        return reject();
      }

      this.shaka = shaka;
      this.shaka.polyfill.installAll();  
      this.browserSupported = this.shaka.Player.isBrowserSupported();
      
      if (!this.browserSupported) {
        console.error("Browser doesn't support Shaka Video player.");
        return reject();
      }
    
      return resolve(this.shaka);
    });
  }
  
  public ready(): Promise<any> {
    return this.shakaPromise;
  }
  
}
