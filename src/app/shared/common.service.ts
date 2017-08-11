import { Injectable } from '@angular/core';
import { Web3Service } from "./web3.service";

@Injectable()
export class CommonService {

  constructor(private web3Service: Web3Service) { }

  public getChainHeight(): Promise<number> {
    return new Promise(resolve => {
      this.web3Service.connect((eer, web3) => {
        web3.eth.getBlockNumber((err, num) => {
          resolve(num);
        })
      })
    })
  }

  public getNetworkId(): Promise<number> {
    return new Promise(resolve => {
      this.web3Service.connect((err, web3) => {
        web3.version.getNetwork((err, num) => {
          resolve(num);
        })
      })
    })
  }

  public getHashRate(): Promise<number> {
    return new Promise(resolve => {
      this.web3Service.connect((err, web3) => {
        web3.eth.getHashrate((err, num) => {
          resolve(num);
        })
      })
    })
  }

}
