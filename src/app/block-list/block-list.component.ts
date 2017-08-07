import { Component, OnInit } from '@angular/core';
import { Block } from "./block.model";

@Component({
  selector: 'app-block-list',
  templateUrl: './block-list.component.html',
  styleUrls: ['./block-list.component.scss']
})
export class BlockListComponent implements OnInit {
  blocks: Block[];

  constructor() { 
    this.blocks = [
      new Block(2345, '1minago', 34, 'miner', '0x3e', 523),
      new Block(2346, '2minago', 34, 'miner', '0x3e', 523),
      new Block(2347, '3minago', 34, 'miner', '0x3e', 523)
    ]
  }

  ngOnInit() {
  }

}
