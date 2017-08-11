import { Injectable } from '@angular/core';
import { Transaction } from "./transaction.model";
import { Web3Service } from "./../../shared/web3.service";
import { BlocksService } from "./../../blocks/shared/blocks.service";
import { Block } from "./../../blocks/shared/block.model";

@Injectable()
export class TransactionsService {
  private blocks:Array<Block> = [];
  private txnList:Array<string> = [];
  private txns:Array<Transaction> = [];

  constructor(
    private web3Service: Web3Service,
    private blocksService: BlocksService) { }

  private createTxnFromResponse(response: any): Transaction {
    return new Transaction(
      response.hash,
      response.nonce,
      response.blockHash,
      response.from,
      response.to,
      response.value,
      response.gasPrice,
      response.gas,
      response.input
    )
  }
 
}
