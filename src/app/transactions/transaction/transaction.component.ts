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
      image: '/assets/delivery-truck.png',
      details: [`address: ${d.farm.address}`, `contact: ${d.farm.mobileNo}`]
    }
  if(d.seeding) 
    return {
      title: "Seeding",
      image: '/assets/delivery-truck.png',
      details: [`Plot: ${d.seeding.plotName}`, `Seeding Date: ${d.seeding.seedingDate}`, `Location: ${d.seeding.location}`]
    }
  if(d.plantation) 
    return {
      title: "Plantation",
      image: '/assets/delivery-truck.png',
      details: [`Plantation Date: ${d.plantation.timestamp}`, `Fertilizer Amount: ${d.plantation.fertilizerAmount}`, `Weed Control: ${d.plantation.weedControl}`]
    }
  if(d.collection) 
    return {
      title: "Collection",
      image: '/assets/delivery-truck.png',
      details: [`Batch ID: ${d.collection.batchID}`, `Storage Condition: ${d.collection.storageCondition}`, `Collection Date: ${d.collection.collectionDate}`, `Barcode: ${d.collection.barcode}`, `Harvest Quality: ${d.collection.qualityOfHarvest}`]
    }
  if(d.transport) 
      return {
        title: "Transportation",
        image: '/assets/delivery-truck.png',
        details: [
          `Barcodes: ${d.transport.barcodes}`, 
          `Truck Condition: ${d.transport.truckCondition}`, 
          `Timestamp: ${d.transport.timestamp}`]
      }
  if(d.washing) 
    return {
      title: "Washing Stage",
      image: '/assets/delivery-truck.png',
      details: [
        `OfficerID: ${d.washing.officerID}`, 
        `Clean Yield: ${d.washing.cleanedYield}`, 
        `pH Sensor: ${d.washing.phSensorID}`, 
        `Timestamp: ${d.washing.timestamp}`]
    }
  if(d.cleaning) 
    return {
      title: "Cleaning Stage",
      image: '/assets/delivery-truck.png',
      details: [
        `Facility: ${d.cleaning.cleaningFacilityName}`, 
        `Barcodes: ${d.cleaning.barcodes}`, 
        `Timestamp: ${d.cleaning.timestamp}`]
    }
  if(d.storage) 
    return {
      title: "Storage Stage",
      image: '/assets/delivery-truck.png',
      details: [
        `Rack No: ${d.storage.rackNo}`, 
        `Temperature: ${d.storage.temperature}`, 
        `Humidity: ${d.storage.humidity}`, 
        `Barcodes: ${d.storage.barcodes}`]
    }
  if(d.packaging) 
    return {
      title: "Packaging Stage",
      image: '/assets/delivery-truck.png',
      details: [
        `OrderID: ${d.packaging.orderID}`, 
        `Package: ${d.packaging.packageType}`, 
        `Timestamp: ${d.packaging.timestamp}`, 
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