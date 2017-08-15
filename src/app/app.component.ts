import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public chainHeight: number = 0;
  public networkId: string = '0';
  public hashRate: string = '0';

  constructor() {}

  ngOnInit() {}
}
