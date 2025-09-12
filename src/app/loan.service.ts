import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from './loan';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/loans`;

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(this.apiUrl);
  }

  getLoan(id: string): Observable<Loan> {
    return this.http.get<Loan>(`${this.apiUrl}/${id}`);
  }

  createLoan(loan: Omit<Loan, 'id'>): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  updateLoan(loan: Loan): Observable<Loan> {
    return this.http.put<Loan>(`${this.apiUrl}/${loan.id}`, loan);
  }

  deleteLoan(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
