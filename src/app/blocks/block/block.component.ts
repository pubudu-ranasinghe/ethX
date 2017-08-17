import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
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
    this.route.params.subscribe((params: Params) => {
        let userId = params['id'];
        console.log(userId);
      });
  }

}
