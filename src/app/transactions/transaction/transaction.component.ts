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
  transaction: any = {};
  web3: any;
  contractAddress: string;
  data: any;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private transacionsService: TransactionsService,
    private db: AngularFireDatabase,
    private http: Http
  ) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.contractAddress = params['id'];

      
      this.transacionsService.getTxnData(this.contractAddress).then(val => {
        this.transaction = val;
        console.log(val.input);
          this.transacionsService.getContractData(this.contractAddress).then(val => {
            this.data = getDisplayData(val._body);
            console.log(this.data)
          })
      })
    });

  }

}

function getDisplayData(data): any {
  let d = JSON.parse(data);
  if(d.farm) 
    return {
      title: d.farm.name,
      details: [d.farm.address, d.farm.mobileNo]
    }
  if(d.seeding) 
    return {
      title: "Seeding",
      details: [d.seeding.plotName, d.seeding.seedingDate, d.seeding.location]
    }
  if(d.plantation) 
    return {
      title: "Plantation",
      details: [d.plantation.timestamp, d.plantation.fertilizerAmount, d.plantation.weedControl]
    }
  if(d.collection) 
    return {
      title: "Collection",
      details: [d.collection.batchID, d.collection.storageCondition, d.collection.collectionDate, d.collection.barcode, d.collection.qualityOfHarvest]
    }
  if(d.transport) 
      return {
        title: "Transportation",
        details: [d.transport.barcodes, d.transport.truckCondition, d.transport.timestamp]
      }
  if(d.washing) 
    return {
      title: "Washing Stage",
      details: [d.washing.officerID, d.washing.cleanedYield, d.washing.phSensorID, d.washing.timestamp]
    }
  if(d.cleaning) 
    return {
      title: "Cleaning Stage",
      details: [d.cleaning.cleaningFacilityName, d.cleaning.barcodes, d.cleaning.timestamp]
    }
  if(d.storage) 
    return {
      title: "Storage Stage",
      details: [d.storage.rackNo, d.storage.temperature, d.storage.humidity, d.storage.barcodes]
    }
  if(d.packaging) 
    return {
      title: "Packaging Stage",
      details: [d.packaging.orderID, d.packaging.packageType, d.packaging.timestamp, d.packaging.barcodes]
    }
  return null
}

function checkTransacion(transaction) {
  if (transaction == undefined) {
    window.setTimeout(checkTransacion, 100); /* this checks the transaction every 100 milliseconds*/
  } else {
    this.transaction = transaction;
    return transaction;
  }
}