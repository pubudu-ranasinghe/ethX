import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Block } from "./../shared/block.model";
import { BlocksService } from "./../shared/blocks.service";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers: [BlocksService]
})
export class BlockListComponent implements OnInit {
  public blocks: Array<Block> = [];

  constructor(private blocksService: BlocksService) { }

  ngOnInit() {
    this.blocksService.getBlocks().then(
      blocks => {
        this.blocks = blocks;
      }
    )
  }

}
