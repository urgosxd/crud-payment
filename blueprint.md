# Loan Payment Calculator

## Overview

A simple Angular application to manage loan payment calculations. It allows users to create, view, update, and delete loans, and it calculates the monthly payment for each loan.

## Features

*   **CRUD Operations:** Create, read, update, and delete loans.
*   **Loan Calculation:** Automatically calculates the monthly loan payment based on the loan amount, interest rate, and number of years.
*   **Reactive UI:** The UI updates automatically when the loan data changes.
*   **Modern Angular:** Built with the latest Angular features, including standalone components, signals, and new control flow syntax.
*   **Visually Appealing:** A modern and intuitive user interface.

## Design and Style

*   **Typography:** 'Poppins' from Google Fonts.
*   **Color Palette:**
    *   Primary: `#007bff`
    *   Secondary: `#6c757d`
    *   Success: `#28a745`
    *   Danger: `#dc3545`
*   **Layout:** A two-column layout with a list of loans on the left and the loan details on the right.
*   **Components:**
    *   Styled with shadows and rounded corners to create a "card" look.
    *   Buttons have hover effects and transitions.
    *   The selected loan in the list is highlighted.

## Current Plan

The final phase of development was to improve the visual design and user experience of the application. This has been completed.

**Completed Steps:**

1.  **Global Styles:**
    *   Imported 'Poppins' font.
    *   Defined a color palette in `:root`.
    *   Updated body styles.
2.  **`app.component.css`:**
    *   Refined the main layout with a card-based design.
    *   Improved button styles with hover effects.
3.  **`loan-list/loan-list.css`:**
    *   Styled the loan list for better visual appeal.
    *   Added a "selected" state for the active loan.
4.  **`loan-detail/loan-detail.css`:**
    *   Improved the layout and typography of the loan details view.
5.  **`loan-edit/loan-edit.css`:**
    *   Enhanced the styling of the loan edit form for a better user experience.
6.  **Final Build:** Ran `ng build` to ensure there are no compilation errors.
