import { Component, ViewChild } from '@angular/core';
import { DiscountService } from '../../../app-logic/services/discount.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { DiscountDto } from '../../../app-logic/DTOs/discount-dto';

@Component({
  selector: 'app-discount-admin',
  templateUrl: './discount-admin.component.html',
  styleUrl: './discount-admin.component.css'
})
export class DiscountAdminComponent {
  discountData: MatTableDataSource<DiscountDto>;
  discountColumns: string[] = [
    'select',
    'discountId',
    'discountName',
    'discountDescription',
    'flightId',
    'discountPercentage',
    'startDate',
    'endDate',
    'edit',
  ];
  selection = new SelectionModel<DiscountDto>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private discountService: DiscountService) {
    this.discountData = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadDiscounts();
  }

  loadDiscounts() {
    this.discountService.getDiscounts().subscribe(discounts => {
      this.discountData.data = discounts;
      this.discountData.paginator = this.paginator;
      this.discountData.sort = this.sort;
    });
  }

  deleteDiscount(id: number) {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.discountService.deleteDiscount(id).subscribe(() => {
        this.loadDiscounts();
      });
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.discountData.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.discountData.data.forEach(row => this.selection.select(row));
  }
}