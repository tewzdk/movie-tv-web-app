import { Component, effect, OnDestroy, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Subject,
  takeUntil,
} from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'search-field',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './search-field.component.html',
  styleUrl: './search-field.component.scss',
})
export class SearchFieldComponent implements OnDestroy {
  searchValueChange = output<string>();
  // on input set the search term
  value: string = '';
  private searchInput$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private searchService: SearchService) {
    // Subscribe to search value changes with Angular Signals
    effect(() => {
      this.value = this.searchService.searchValue();
      this.searchValueChange.emit(this.value);
    });
    // Subscribe to search input changes with RxJS operators
    this.searchInput$
      .pipe(
        debounceTime(1000), // Wait 1 second after the user stops typing
        filter((term) => term.length === 0 || term.length >= 3), // Allow empty or 3+ characters
        distinctUntilChanged(), // Ignore consecutive duplicate values
        takeUntil(this.destroy$) // Clean up on component destruction
      )
      .subscribe((searchTerm) => {
        this.performSearch(searchTerm);
      });
  }

  onClear() {
    this.value = '';
    this.performSearch(this.value);
  }

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.searchInput$.next(inputValue); // Emit value to the search stream
  }

  performSearch(term: string): void {
    this.searchService.updateSearchValue(term);
  }

  ngOnDestroy(): void {
    // Unsubscribe from observables to prevent memory leaks
    this.destroy$.next();
    this.destroy$.complete();
  }
}
