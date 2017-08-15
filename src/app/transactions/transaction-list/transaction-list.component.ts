import { Component, OnInit } from '@angular/core';
import { BigNumber } from "bignumber.js";
import { Transaction } from "./../shared/transaction.model";
import { TransactionsService } from "./../shared/transactions.service";
import { BlocksService } from "./../../blocks/shared/blocks.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [TransactionsService, BlocksService]
})
export class TransactionListComponent implements OnInit {
  public txns: Array<Transaction> = [];
  public items: FirebaseListObservable<any[]>;

  constructor(private transactionsService: TransactionsService, private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.txns.push(new Transaction('ox',1,'e','e','e',new BigNumber(23),new BigNumber(23),12,'22')) 
    this.items = this.db.list('/transactions', {
      query: {
        limitToLast: 20,
        orderByChild: 'timestamp'
      }
    });
  }

}
