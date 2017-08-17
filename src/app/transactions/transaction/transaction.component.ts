import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "@angular/common";
import { TransactionsService } from '../shared/transactions.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Http } from '@angular/http';
import Web3 from 'web3';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers: [TransactionsService]

})
export class TransactionComponent implements OnInit {
  transactionService: TransactionsService;
  transaction: any;
  web3: any;
  contractAddress: string;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private transacionsService: TransactionsService,
    private db: AngularFireDatabase,
    private http: Http
  ) { }

  ngOnInit() {

    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.transactionService.getTransaction(params.get('id'))
    //   .then(function(transaction){return transaction;}))
    //   .subscribe(transaction => {
    //     // checkTransacion(transaction).bind(this);
    //     transaction = transaction;
    //     console.log(transaction);
    //     //alert(this.transaction);
    //   });

    this.route.params.subscribe((params: Params) => {
      this.contractAddress = params['id'];
      console.log(this.contractAddress);
      // this.db.list('transactions', {
      //   query: {
      //     orderByChild: 'hash',
      //     equalTo: this.contractAddress
      //   }
      // }).subscribe((data) => {
      //   this.transaction = data[0];
      //   console.log(this.transaction);
      // })
      this.transacionsService.getTxnData(this.contractAddress).then(val => {
        this.transaction = val;
        console.log(this.transaction.to)
        this.transacionsService.getContractData(this.transaction.to).then(val => {
          console.log(val._body)
          this.transaction.value = JSON.stringify(val._body);
        })
      })
    });


    // this.http.get('http://localhost:3001/v1/blockchain/contract/0x0979c0f660216ea95e74dfa67202d7d09cf48d12').subscribe( data=> {
    //   console.log(data);
    // });
    // this.http.get('http://localhost:3001/v1/blockchain/contract/0x0979c0f660216ea95e74dfa67202d7d09cf48d12').forEach(val => {
    //   console.log(val)
    // })


  }

}

function checkTransacion(transaction) {
  if (transaction == undefined) {
    window.setTimeout(checkTransacion, 100); /* this checks the transaction every 100 milliseconds*/
  } else {
    this.transaction = transaction;
    return transaction;
  }
}