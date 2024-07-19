import { Component, ViewChild } from '@angular/core';
import { DiscountListMockService } from '../../../app-logic/discount-list-mock.service';
import { DiscountItem } from '../../../app-logic/models/discount-item';
import { DiscountService } from '../../../app-logic/services/discount.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-discount-admin',
  templateUrl: './discount-admin.component.html',
  styleUrl: './discount-admin.component.css'
})
export class DiscountAdminComponent {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  inventoryItems: any;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;
  discountData: any;
  discountColumns: string[] = [
    'discountId',
    'discountName',
    'discountDescription',
    'flightId',
    'discountPercentage',
    'startDate',
    'endDate',
    'action'
  ];

  constructor(private discountService: DiscountService) {}
  selection = new SelectionModel<Element>(true, []);

  ngOnInit(): void {

    this.discountService.getDiscounts().subscribe(data => {
      this.discountData = new MatTableDataSource<DiscountItem>(data);
      this.discountData.paginator = this.paginator;
      this.discountData.sort = this.sort;
      console.log(this.discountService);
    });
    

  }
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.inventoryItems.data.forEach((row: Element) => {
          this.selection.select(row);
        });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inventoryItems.data.length;
    return numSelected === numRows;
  }
}
