import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Block } from "./../shared/block.model";
import { BlocksService } from "./../shared/blocks.service";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers: [BlocksService]
})
export class BlockListComponent implements OnInit {
  public blocks: Array<Block> = [];
  public items: FirebaseListObservable<any[]>;


  constructor(private blocksService: BlocksService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.items = this.db.list('/blocks', {
      query: {
        limitToLast: 10,
        orderByChild: 'number'
      }
    });
  }

}
