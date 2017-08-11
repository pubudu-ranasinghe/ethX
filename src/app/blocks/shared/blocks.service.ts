import { Injectable } from '@angular/core';
import { Block } from "./block.model";
import { Web3Service } from "./../../shared/web3.service";

@Injectable()
export class BlocksService {

  constructor(private web3Service: Web3Service) { }

  getBlock(id: number): Promise<Block> {
    return new Promise(resolve => {
      this.web3Service.connect((err, web3) => {
        web3.eth.getBlock(id, (err, result) => {
          var b = new Block(
            result.number,
            result.timestamp,
            result.transactions.length,
            result.miner,
            result.hash,
            result.size,
            result.transactions);
          resolve(b);
        })
      })
    })
  }

  public getBlocks(): Promise<Block[]> {
    return new Promise(resolve => {
      this.web3Service.connect((err, web3) => {
        web3.eth.getBlockNumber((err, currentBlock) => {

          var blocks: Block[] = [];
          var finished: Boolean = false;
          for(var i = 0; i < 10; i++) {
            
            web3.eth.getBlock(currentBlock - i, (err, result) => {
              blocks.push(this.createBlockFromResponse(result));
              if(blocks.length == 10 ) resolve(blocks);
            });
          }
        });
      });
    });
  }

  private createBlockFromResponse(response: any): Block {
    return new Block(
      response.number,
      response.timestamp,
      response.transactions.length,
      response.miner,
      response.hash,
      response.size,
      response.transactions);
  }

}
