import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location } from "@angular/common";
import { TransactionsService } from '../shared/transactions.service';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Http } from '@angular/http';
import Web3 from 'web3';
import * as moment from 'moment'

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
      image: '/assets/farm.png',
      details: [
        `Address: ${d.farm.address}`, 
        `Contact: ${d.farm.mobileNo}`]
    }
  if(d.seeding) 
    return {
      title: "Seeding",
      image: '/assets/seeding.png',
      details: [
        `Plot: ${d.seeding.plotName}`, 
        `Seeding Date: ${moment(d.seeding.seedingDate).format('MMM Do YY')}`, 
        `Location: ${d.seeding.location}`]
    }
  if(d.plantation) 
    return {
      title: "Plantation",
      image: '/assets/plantation.png',
      details: [
        `Plantation Date: ${moment(d.plantation.timestamp).format('MMM Do YY')}`, 
        `Fertilizer Amount: ${d.plantation.fertilizerAmount}`, 
        `Weed Control: ${d.plantation.weedControl}`]
    }
  if(d.collection) 
    return {
      title: "Collection",
      image: '/assets/harvest.png',
      details: [
        `Batch ID: ${d.collection.batchID}`, 
        `Storage Condition: ${d.collection.storageCondition}`, 
        `Collection Date: ${moment(d.collection.collectionDate).format('MMM Do YY')}`, 
        `Barcode: ${d.collection.barcode}`, 
        `Final Yield: ${d.collection.finalYield}`]
    }
  if(d.transport) 
      return {
        title: "Transportation",
        image: '/assets/delivery-truck.png',
        details: [
          `Barcodes: ${d.transport.barcodes}`, 
          `Truck Condition: ${d.transport.truckCondition}`, 
          `Timestamp: ${moment(d.transport.timestamp).format('MMM Do YY')}`]
      }
  if(d.washing) 
    return {
      title: "Washing Stage",
      image: '/assets/water.png',
      details: [
        `OfficerID: ${d.washing.officerID}`, 
        `Clean Yield: ${d.washing.cleanedYield}`, 
        `pH Sensor: ${d.washing.phSensorID}`, 
        `Timestamp: ${moment(d.washing.timestamp).format('MMM Do YY')}`]
    }
  if(d.cleaning) 
    return {
      title: "Cleaning Stage",
      image: '/assets/water.png',
      details: [
        `Facility: ${d.cleaning.cleaningFacilityName}`, 
        `Barcodes: ${d.cleaning.barcodes}`, 
        `Timestamp: ${moment(d.cleaning.timestamp).format('MMM Do YY')}`]
    }
  if(d.storage) 
    return {
      title: "Storage Stage",
      image: '/assets/warehouse.png',
      details: [
        `Rack No: ${d.storage.rackNo}`, 
        `Temperature: ${d.storage.temperature}`, 
        `Humidity: ${d.storage.humidity}`, 
        `Barcodes: ${d.storage.barcodes}`]
    }
  if(d.packaging) 
    return {
      title: "Packaging Stage",
      image: '/assets/package.png',
      details: [
        `OrderID: ${d.packaging.orderID}`, 
        `Package: ${d.packaging.packageType}`, 
        `Timestamp: ${moment(d.packaging.timestamp).format('MMM Do YY')}`, 
        `Barcodes: ${d.packaging.barcodes}`]
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