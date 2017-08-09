import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Block } from "./block.model";
import { BlockListService } from "./block-list.service";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers: [BlockListService]
})
export class BlockListComponent implements OnInit {
  public blocks: Array<Block> = [];

  constructor(private blockListService: BlockListService) { 
    // this.blocks.push(new Block(2345, '1minago', 34, 'miner', '0x3e', 523));
  }

  ngOnInit() {
    // let sub = this.blockListService.data.subscribe(
    //   // value => console.log(value)
    // )
    this.blockListService.getB2().subscribe(
      v => {
        this.blocks.push(new Block(2345, '1minago', 34, 'miner', '0x3e', 523));
        console.log(v);
      },
      // v => this.blocks.push(new Block(2345, '1minago', 34, 'miner', '0x3e', 523)),
      e => console.log(e),
      () => console.log('finished')
    )
  }

}
