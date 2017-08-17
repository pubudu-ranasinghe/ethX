import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class DbserviceService {
  public items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  // public get(): Promise<number> {
  //   // return new Promise(resolve => {
  //   //   this.web3Service.connect((eer, web3) => {
  //   //     web3.eth.getBlockNumber((err, num) => {
  //   //       resolve(num);
  //   //     })
  //   //   })
  //   // })

}
