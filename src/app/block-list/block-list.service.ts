import { Injectable } from '@angular/core';

import { Block } from "./block.model";

@Injectable()
export class BlockListService {
  private blocks: Block[];

  constructor() {
    this.blocks = [
      new Block(2345, '1minago', 34, 'miner', '0x3e', 523),
      new Block(2346, '2minago', 34, 'miner', '0x3e', 523),
      new Block(2347, '3minago', 34, 'miner', '0x3e', 523)
    ]
  }

  getBlocks(): Promise<Block[]> {
    return Promise.resolve(this.blocks);
  }

}
