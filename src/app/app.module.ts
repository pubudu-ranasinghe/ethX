import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { Web3Service } from "./shared/web3.service";
import { RouterModule } from "@angular/router";
import { BlockListComponent } from './blocks/block-list/block-list.component';
import { BlockComponent } from './blocks/block/block.component';
import { TransactionListComponent } from './transactions/transaction-list/transaction-list.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockListComponent,
    BlockComponent,
    TransactionListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
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
      }
    ])
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
