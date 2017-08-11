import { Injectable } from '@angular/core';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private web3Instance: any;
  private WEB3_DELAY = 0;

  constructor() {
  }
  
  connect(callback): void {
    setTimeout(function() {
      if(typeof window['web3'] !== 'undefined') {
        console.log('Using injected web3');
        this.web3 = new Web3(window['web3'].currentProvider);
      } else {
        this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:30001"));
        console.log("connecting to local node");
      }
      if(!this.web3.isConnected())
        callback("Didn't connect", null);
      else {
        console.log("Web3 Connected");
        callback(null, this.web3);
      }
    }, this.WEB3_DELAY);
  }

  
  get web3() : any {
    if(!this.web3Instance) {
      this.connect((err, web3) => {
        if(err) throw err;
        console.log(web3);
      });
    }
    return this.web3Instance;
  }

  set web3(web3: any) {
    this.web3Instance = web3;
  }
  

}
