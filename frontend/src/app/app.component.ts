import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Douling Dương';
  isReady = false;
  loginRouter = false;
  loadIndex = false;

  constructor(private router: Router) {
    {
      this.router.events.subscribe(
        (event: any) => {
          if (event instanceof NavigationEnd) {
            console.log('this.router.url', this.router.url);
            if (this.router.url === '/') {
              this.loadIndex = true;
            } else if (this.router.url.indexOf('admin/login') > -1) {
              this.loginRouter = true;
            }
          }
        }
      );
    }

    setTimeout(() => {
      this.isReady = true;
    }, 1000);
  }
}
