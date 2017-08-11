import { Component, OnInit } from '@angular/core';
import filesize from "filesize";
import { CommonService } from "./shared/common.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CommonService]
})
export class AppComponent implements OnInit {
  public chainHeight: number = 0;
  public networkId: string = '0';
  public hashRate: string = '0';

  constructor(private commonService: CommonService) {}

  ngOnInit() {
    this.commonService.getChainHeight().then(num => this.chainHeight = num);
    this.commonService.getNetworkId().then(num => {
      if(num == 1) this.networkId = "Homestead" 
      else if(num == 2) this.networkId = "Morden" 
      else if(num == 3) this.networkId = "Ropsten" 
      else if(num == 4) this.networkId = "Rinkeby" 
      else this.networkId = "Private " + num; 
    });
    this.commonService.getHashRate().then(num => {
      this.hashRate = filesize(num, {symbols: {B: "Hs", K: "KHs"}});
    });
  }
}
