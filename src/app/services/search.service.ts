import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // Signal to store the search value
  private searchValueSignal = signal<string>('');

  // Getter for the signal to expose it as readonly
  get searchValue() {
    return this.searchValueSignal.asReadonly();
  }

  // Method to update the search value
  updateSearchValue(value: string): void {
    this.searchValueSignal.set(value);
  }
}
