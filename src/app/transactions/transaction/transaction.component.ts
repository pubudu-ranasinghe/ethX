import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,    
    private location: Location,
  ) { }

  ngOnInit() { 
  }

}
