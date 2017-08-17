import { Injectable } from '@angular/core';
import { Transaction } from "./transaction.model";
import { Web3Service } from "./../../shared/web3.service";
import { BlocksService } from "./../../blocks/shared/blocks.service";
import { Block } from "./../../blocks/shared/block.model";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class TransactionsService {
  private blocks:Array<Block> = [];
  private txnList:Array<string> = [];
  private txns:Array<Transaction> = [];
  public items: FirebaseListObservable<any[]>;

  constructor(
    private web3Service: Web3Service,
    private blocksService: BlocksService,
    private db: AngularFireDatabase) { }

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

  getContractFields(transactionAddress){
    this.items = this.db.list('/transactions/'+transactionAddress, {
      query: {
        orderByChild: 'timestamp'
      }
    });
    
    this.items.forEach( (element)=>{
      console.log(element);
    });
  }
 
}
