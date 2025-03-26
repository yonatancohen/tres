import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from '../../services/dashboard.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

Chart.register(...registerables);

@Component({
  selector: 'app-charts',
  imports: [CommonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;
  chartData$: Observable<any>;

  constructor(private dashboardService: DashboardService) { 
    this.chartData$ = this.dashboardService.getChartData();
  }

  ngAfterViewInit(): void {
    // Use the async data once (with first()) to initialize the chart
    this.chartData$.pipe(first()).subscribe(data => {
      this.initChart(data);
    });
  }

  initChart(data: any): void {
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Balance Over Time',
          data: data.values,
          fill: false,
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true
          }
        }
      }
    };

    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
