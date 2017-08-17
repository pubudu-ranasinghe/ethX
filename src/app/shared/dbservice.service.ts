import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Injectable()
export class DbserviceService {
  public items: FirebaseListObservable<any[]>;

  constructor(private db: AngularFireDatabase) { }

  // public get(): Promise<any> {
  //   return new Promise(resolve => {
  //     this.db.list('/transactions', {
  //       query: {
  //         orderByChild: 'hash',
  //         equalTo: '0x952ae3686cee3660a84363b2c4740b0762a4c3f846f6c614dd8d4a77e2e6b365'
  //       }
  //     }).subscribe(data => {
  //       console.log(data);
  //     })
  //   })

  }
