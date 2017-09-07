import { Injectable } from '@angular/core';
import { Block } from "../../blocks/shared/block.model";
import { Transaction } from "./transaction.model";
import { Web3Service } from "./../../shared/web3.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { BigNumber } from "bignumber.js";

@Injectable()
export class TransactionsService {
  transaction: Transaction;

  constructor(
    private http: Http,
    private web3Service: Web3Service,
    private db: AngularFireDatabase) { }

  
  public getContractData(contractAddress): Promise<any> {
    return new Promise((resolve => {
      // this.http.get('http://api.nerdlk.com/v1/blockchain/contract/'+contractAddress).subscribe(val => {
      //   resolve(val);
      // })
      this.http.get('http://api2.pubuduranasinghe.com/v1/blockchain/getdata/'+contractAddress).subscribe(val => {
        resolve(val);
      })
    }))
  }

  public getTxnData(contractAddress): Promise<any> {
    return new Promise((resolve => {
      this.db.list('transactions', {
        query: {
          orderByChild: 'hash',
          equalTo: contractAddress
        }
      }).subscribe((data) => {
        this.transaction = this.createTxnFromResponse(data[0]);
        resolve(this.transaction);
      })
      // resolve({input: '3434', to: 34344});
    }))
  }

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

  getTransaction(id: string): Promise<Transaction> { 
     return new Promise(resolve => {
       console.log("inside");
      this.web3Service.connect((err, web3) => {
        web3.eth.getTransaction(id, (err, result) => {
          var t = new Transaction(

            result.hash,
            result.nonce,
            result.blockHash,
            result.from,
            result.to,
            result.value,
            result.gasPrice,
            result.gas,
            result.input
        );
          resolve(t);
        })
      })
    })
//     return new Promise(resolve => {
//       this.web3Service.connect((err, web3) => {
//         web3.eth.getBlock(20289, (err, result) => {
// console.log("block");
//           console.log(result);
//           var b = new Block(
//             result.number,
//             result.timestamp,
//             result.transactions.length,
//             result.miner,
//             result.hash,
//             result.size,
//             result.transactions);
//           resolve(b);
//         })
//       })
//     })

  }
 
}
