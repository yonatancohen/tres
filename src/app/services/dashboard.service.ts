import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { delay, map, scan, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private transactionsSubject = new BehaviorSubject<any[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor() {}

  getAccountSummary(): Observable<any> {
    // Simulated data for the account summary
    const data = {
      balance: 15000,
      income: 5000,
      expenses: 3500
    };
    // Simulate an asynchronous API call with a delay
    return of(data).pipe(delay(500));
  }

  getTransactions() {
    interval(1000).pipe(
      startWith(0), // מפעיל קריאה מיד עם ההרשמה
      map(() => ({
        date: new Date(),
        description: 'New Transaction',
        amount: Math.round(Math.random() * 200 - 100) // סכום אקראי בין -100 ל-100
      })),
      scan((acc, transaction) => [...acc, transaction], [] as any[]),
      delay(500) // סימולציה של עיכוב רשת
    ).subscribe({
      next: (transactions) => {
        this.transactionsSubject.next(transactions)
      },
      error: (err) => console.error('Error in transactions stream:', err)
    });
  }

  getChartData(): Observable<any> {
    // Simulated chart data
    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      values: [10000, 12000, 11000, 15000, 13000, 16000]
    };
    return of(chartData).pipe(delay(500));
  }
}
