import { Component, OnInit } from '@angular/core';

import { TransactionsService } from '../shared/transactions.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],

  providers: [TransactionsService]

})
export class TransactionComponent implements OnInit {
  transaction: Transaction;


  constructor(
  	private route: ActivatedRoute,
    private location: Location,
    private transacionsService: TransactionsService
    ) { }

  ngOnInit() { 

  	this.route.paramMap
      .switchMap((params: ParamMap) => this.transacionsService.getTransaction(params.get('id')).then(function(transaction){return transaction;}))
      .subscribe(transaction => {
        // checkTransacion(transaction).bind(this);
        this.transaction = transaction;
        console.log(this.transaction);
        //alert(this.transaction);
      });

  }

}

function checkTransacion(transaction) {
    if(transaction == undefined) {
       window.setTimeout(checkTransacion, 100); /* this checks the transaction every 100 milliseconds*/
    } else {
      this.transaction = transaction;
      return transaction;
    }
}