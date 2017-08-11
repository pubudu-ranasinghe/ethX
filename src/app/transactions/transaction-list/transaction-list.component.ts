import { Component, OnInit } from '@angular/core';
import { BigNumber } from "bignumber.js";
import { Transaction } from "./../shared/transaction.model";
import { TransactionsService } from "./../shared/transactions.service";
import { BlocksService } from "./../../blocks/shared/blocks.service";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss'],
  providers: [TransactionsService, BlocksService]
})
export class TransactionListComponent implements OnInit {
  public txns: Array<Transaction> = [];

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit() {
    this.txns.push(new Transaction('ox',1,'e','e','e',new BigNumber(23),new BigNumber(23),12,'22')) 
  }

}
