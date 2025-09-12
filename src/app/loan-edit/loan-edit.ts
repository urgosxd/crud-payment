import { ChangeDetectionStrategy, Component, input, output, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loan } from '../loan';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.html',
  styleUrls: ['./loan-edit.css'],
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanEditComponent implements OnInit {
  private fb = inject(FormBuilder);

  loan = input.required<Loan>();
  save = output<Loan>();
  cancel = output<void>();

  loanForm!: FormGroup;

  ngOnInit(): void {
    this.loanForm = this.fb.group({
      loanAmount: [this.loan().loanAmount, [Validators.required, Validators.min(1)]],
      annualInterestRate: [
        this.loan().annualInterestRate * 100,
        [Validators.required, Validators.min(0.1), Validators.max(100)],
      ],
      numberOfYears: [this.loan().numberOfYears, [Validators.required, Validators.min(1)]],
    });
  }

  saveForm(): void {
    if (this.loanForm.valid) {
      const formValues = this.loanForm.value;
      const updatedLoan: Loan = {
        ...this.loan(),
        loanAmount: formValues.loanAmount,
        annualInterestRate: formValues.annualInterestRate / 100,
        numberOfYears: formValues.numberOfYears,
      };
      this.save.emit(updatedLoan);
    }
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}
