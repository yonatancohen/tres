import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { ChartsComponent } from './charts/charts.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    AccountSummaryComponent,
    TransactionsTableComponent,
    ChartsComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}