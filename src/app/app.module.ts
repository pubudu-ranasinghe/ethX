import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from "../environments/environment";

import { Web3Service } from "./shared/web3.service";
import { RouterModule } from "@angular/router";
import { BlockListComponent } from './blocks/block-list/block-list.component';
import { BlockComponent } from './blocks/block/block.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { HomeComponent } from './home/home.component';
import { OrderByPipe } from 'angular-pipes/src/array/order-by.pipe';
import { HumanTimePipe } from './shared/human-time.pipe';
import { TransactionComponent } from './transactions/transaction/transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockListComponent,
    BlockComponent,
    TransactionListComponent,
    HomeComponent,
    OrderByPipe,
    HumanTimePipe,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'blocks',
        component: BlockListComponent
      },
      {
        path: 'block/:id',
        component: BlockComponent
      },
      {
        path: 'transactions',
        component: TransactionListComponent
      },
      {
        path: 'transaction/:id',
        component: TransactionComponent
      }
    ])
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
