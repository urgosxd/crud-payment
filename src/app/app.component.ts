import { ChangeDetectionStrategy, Component, inject, signal, OnInit } from '@angular/core';
import { Loan } from './loan';
import { LoanService } from './loan.service';
import { LoanDetailComponent } from './loan-detail/loan-detail';
import { LoanListComponent } from './loan-list/loan-list';
import { LoanEditComponent } from './loan-edit/loan-edit';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LoanDetailComponent, LoanListComponent, LoanEditComponent]
})
export class AppComponent implements OnInit {
  private loanService = inject(LoanService);

  loans = signal<Loan[]>([]);
  selectedLoan = signal<Loan | null>(null);
  editing = signal(false);
  error = signal<string | null>('Please fill the apiUrl in the environment files and run `npm install`. Then, run `ng serve`');
  loading = signal(false);
  confirmingDelete = signal(false);

  ngOnInit(): void {
    if (environment.apiUrl) {
      this.loadLoans();
    }
  }

  loadLoans(): void {
    this.loading.set(true);
    this.error.set(null);
    this.loanService.getLoans().subscribe({
      next: (loans) => {
        this.loans.set(loans);
        if (loans.length > 0 && !this.selectedLoan()) {
          this.selectedLoan.set(loans[0]);
        }
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Could not load loans.');
        this.loading.set(false);
      },
    });
  }

  onLoanSelected(loan: Loan): void {
    this.selectedLoan.set(loan);
    this.editing.set(false);
  }

  editLoan(): void {
    this.editing.set(true);
  }

  newLoan(): void {
    this.selectedLoan.set({
      id: '',
      loanAmount: 0,
      annualInterestRate: 0,
      loanDate: new Date().toISOString().split('T')[0],
      numberOfYears: 0,
    });
    this.editing.set(true);
  }

  saveLoan(loan: Loan): void {
    if (loan.id) {
      // Update existing loan
      this.loanService.updateLoan(loan).subscribe({
        next: (updatedLoan) => {
          this.selectedLoan.set(updatedLoan);
          this.loadLoans();
          this.editing.set(false);
        },
        error: () => {
          this.error.set('Could not update loan.');
        },
      });
    } else {
      // Create new loan
      const { id, ...newLoan } = loan;
      this.loanService.createLoan(newLoan).subscribe({
        next: (createdLoan) => {
          this.selectedLoan.set(createdLoan);
          this.loadLoans();
          this.editing.set(false);
        },
        error: () => {
          this.error.set('Could not create loan.');
        },
      });
    }
  }

  requestDelete(): void {
    this.confirmingDelete.set(true);
  }

  cancelDelete(): void {
    this.confirmingDelete.set(false);
  }

  confirmDelete(): void {
    const loan = this.selectedLoan();
    if (loan && loan.id) {
      this.loanService.deleteLoan(loan.id).subscribe({
        next: () => {
          this.selectedLoan.set(null);
          this.loadLoans();
          this.confirmingDelete.set(false);
        },
        error: () => {
          this.error.set('Could not delete loan.');
          this.confirmingDelete.set(false);
        },
      });
    }
  }

  cancelEdit(): void {
    this.editing.set(false);
    if (!this.selectedLoan()?.id) {
      this.selectedLoan.set(this.loans()[0] || null);
    }
  }
}
