import { Component, OnInit } from '@angular/core';

import { CommunicationService } from '../shared/communication.service';
import { Good } from '../shared/good.model';
import { GoodsService } from '../shared/goods.service';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html'
})
export class GoodsListComponent implements OnInit {

  goods: Good[] = [];

  constructor(
    private communicationService: CommunicationService,
    private goodsService: GoodsService) {
    
      this.communicationService.goodAdded$.subscribe(good => {
        this.goodsService.addGood(good).subscribe(() => {
          this.getAllGoods();
        });
      });

      this.communicationService.updateGood$.subscribe(good => {
        this.goodsService.updateGood(good).subscribe(() => 
          this.getAllGoods()
        );
      });
   }

  ngOnInit(): void {
    this.getAllGoods();
  }

  editGood(good: Good): void {
    this.communicationService.editGood(good);
  }

  deleteGood(good: Good): void {
    this.goodsService.deleteGood(good.id).subscribe(() => 
      this.getAllGoods()
    );
  }

  private getAllGoods(): void {
    this.goodsService.getGoods().subscribe(goods => 
      this.goods = goods);
  }
}
