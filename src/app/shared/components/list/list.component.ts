import {
  Component,
  ElementRef,
  input,
  OnInit,
  output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Media } from '../../models/media';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MediaItemComponent } from '../media-item/media-item.component';

@Component({
  selector: 'list',
  standalone: true,
  imports: [
    CommonModule,
    InfiniteScrollDirective,
    MediaItemComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @ViewChild('topAnchor') topAnchor!: ElementRef;
  list$ = input.required<Observable<Media[]>>();
  loadMore = output<void>();

  ngOnInit(): void {
    this.list$().subscribe((list) => {});
  }

  scrollToTop(): void {
    if (!this.topAnchor) return;
    try {
      setTimeout(() => {
        this.topAnchor.nativeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'nearest',
        });
      }, 100);
    } catch (err) {}
  }

  loadMoreItems(): void {
    this.loadMore.emit();
  }
}
