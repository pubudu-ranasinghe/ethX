import { Component, OnInit } from '@angular/core';
import { BigNumber } from "bignumber.js";
import { Transaction } from "./../shared/transaction.model";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  public txns: Array<Transaction> = [];

  constructor() { }

  ngOnInit() {
    this.txns.push(new Transaction('ox',1,'e','e','e',new BigNumber(23),new BigNumber(23),12,'22')) 
  }

}
