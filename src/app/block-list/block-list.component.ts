import { Component, OnInit } from '@angular/core';
import { Block } from "./block.model";
import { BlockListService } from "./block-list.service";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss'],
  providers: [BlockListService]
})
export class BlockListComponent implements OnInit {
  blocks: Block[];

  constructor(private blockListService: BlockListService) { 
  }

  ngOnInit() {
    this.blockListService.getBlocks().then(result => this.blocks = result);
  }

}
