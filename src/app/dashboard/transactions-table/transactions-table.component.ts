import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-transactions-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ScrollingModule
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.scss'
})
export class TransactionsTableComponent {
  displayedColumns: string[] = ['date', 'description', 'amount'];
  dataSource = new MatTableDataSource<any>();
  transactions$: Observable<any[]>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dashboardService: DashboardService) { 
    this.transactions$ = this.dashboardService.transactions$;
  }

  ngOnInit(): void {
    this.dashboardService.getTransactions();
  }
}
