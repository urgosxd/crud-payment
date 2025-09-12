import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { Loan } from '../loan';

@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.html',
  styleUrls: ['./loan-detail.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe, DatePipe, PercentPipe]
})
export class LoanDetailComponent {
  loan = input.required<Loan>();
}