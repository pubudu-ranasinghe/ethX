import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../shared/transactions.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  constructor(private ts: TransactionsService, private db: AngularFireDatabase ) { }

  ngOnInit() { 
    this.db.list('/transactions', {
        query: {
          orderByChild: 'hash',
          equalTo: '0x952ae3686cee3660a84363b2c4740b0762a4c3f846f6c614dd8d4a77e2e6b365'
        }
      }).subscribe(data => {
        console.log(data);
      })
  }

}
