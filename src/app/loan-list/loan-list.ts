import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Loan } from '../loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.html',
  styleUrls: ['./loan-list.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanListComponent {
  loans = input.required<Loan[]>();
  loanSelected = output<Loan>();

  selectLoan(loan: Loan): void {
    this.loanSelected.emit(loan);
  }
}