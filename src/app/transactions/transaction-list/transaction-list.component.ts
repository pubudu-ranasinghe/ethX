import { Component, OnInit } from '@angular/core';
import { BigNumber } from "bignumber.js";
import { Transaction } from "./../shared/transaction.model";
import { TransactionsService } from "./../shared/transactions.service";
import { BlocksService } from "./../../blocks/shared/blocks.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [TransactionsService, BlocksService]
})
export class TransactionListComponent implements OnInit {
  public items: FirebaseListObservable<any[]>;
  public items2: Observable<any[]>;
  public txns: any[] = [];

  constructor(private transactionsService: TransactionsService, private db: AngularFireDatabase) { }

  ngOnInit() {
    // this.txns.push(new Transaction('ox',1,'e','e','e',new BigNumber(23),new BigNumber(23),12,'22')) 
    this.items = this.db.list('/transactions', {
      query: {
        limitToLast: 11,
        orderByChild: 'timestamp'
      }
    });
    this.items2 = this.getSTuff();
  }

  getSTuff() : Observable<any[]> {
    return this.db.list('/transactions', {
      query: {
        limitToLast: 11,
        orderByChild: 'timestamp'
      }
    }).map(_items => _items.filter(i => i.to != null));
    
  }

}
