import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Location } from "@angular/common";
import { BlocksService } from "./../shared/blocks.service";
import "rxjs/add/operator/switchMap";
import { Block } from "./../shared/block.model";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
  providers: [BlocksService]
})
export class BlockComponent implements OnInit {
  block: Block;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private blocksService: BlocksService
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.blocksService.getBlock(+params.get('id')))
      .subscribe(block => {
        this.block = block
        console.log(this.block);
      });
  }

}
