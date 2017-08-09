import { Injectable } from '@angular/core';
import { Observable, Scheduler } from "rxjs";

import { Block } from "./block.model";
import { Web3Service } from "./../web3.service";

@Injectable()
export class BlockListService {
  public data: Observable<Block>;

  constructor(private web3Service: Web3Service) {
    // this.blocks = [
    //   new Block(2345, '1minago', 34, 'miner', '0x3e', 523),
    //   new Block(2346, '2minago', 34, 'miner', '0x3e', 523),
    //   new Block(2347, '3minago', 34, 'miner', '0x3e', 523)
    // ];
  }

  getB2(): Observable<Block>{
    this.data = new Observable(observer => {
      // setTimeout(() => {
      //     observer.next(new Block(2345, '1minago', 34, 'miner', '0x3e', 523));
      // }, 1000);
      this.web3Service.connect((err, web3) => {
        web3.eth.getBlockNumber((err, latestBlock) => {
          for(var i = 0; i < 10; i++) {
            web3.eth.getBlock(latestBlock - i, (err, result) => {
              var b = new Block(result.number,
              result.timestamp,
              result.transactions.length,
              result.miner,
              result.hash,
              result.size);
              console.log("Got new block");
              observer.next(b);
            });
          }
        })
      })
    });
    return this.data;
  }


  getBlocks(): Promise<Block[]> {

    return new Promise(resolve => {
      this.web3Service.connect((err, web3) => {
        web3.eth.getBlockNumber((err, currentBlock) => {

          var blocks: Block[];
          for(var i = 0; i < 10; i++) {

          }

          web3.eth.getBlock(currentBlock, (err, result) => {
            var b = new Block(result.number,
              result.timestamp,
              result.transactions.length,
              result.miner,
              result.hash,
              result.size);
            console.log(b);
            resolve([b]);
          });
        });
      });
    });
  }

}
