import {
  AfterViewInit,
  Component,
  inject,
  input,
  output,
  ViewChild,
} from '@angular/core';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { TabsComponent } from '../tabs/tabs.component';
import { ListComponent } from '../list/list.component';
import { Observable } from 'rxjs';
import { Media } from '../../models/media';
import { CommonModule } from '@angular/common';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'media-page',
  standalone: true,
  imports: [CommonModule, ListComponent, TabsComponent, SearchFieldComponent],
  templateUrl: './media-page.component.html',
  styleUrl: './media-page.component.scss',
})
export class MediaPageComponent implements AfterViewInit {
  @ViewChild(ListComponent) childComponent!: ListComponent;

  list$ = input.required<Observable<Media[]>>();
  loading$ = input.required<Observable<boolean>>();
  error$ = input.required<Observable<string | null>>();
  selectedTabIndex = input.required<number>();

  searchValueChange = output<string>();
  loadMore = output<void>();

  searchValue = '';

  private _snackBar = inject(MatSnackBar);

  ngAfterViewInit(): void {
    // Show error message in snackbar, can be improved.
    this.error$().subscribe((error) => {
      if (!error) {
        return;
      }
      this._snackBar.open(error, 'Close');
    });
  }

  searchValueChanged($event: any) {
    this.searchValueChange.emit($event);
    setTimeout(() => {
      this.childComponent.scrollToTop();
    }, 100);
  }

  loadMoreItems(): void {
    this.loadMore.emit();
  }

  snack() {
    this._snackBar.open('Error', 'Close', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
