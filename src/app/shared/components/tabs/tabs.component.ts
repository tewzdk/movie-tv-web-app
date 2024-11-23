import { AfterViewInit, Component, inject, input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { Router } from '@angular/router';
@Component({
  selector: 'tabs',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent implements AfterViewInit {
  selectedTabIndex = input.required<number>();
  tabIndex = 0;
  private _router = inject(Router);

  ngAfterViewInit(): void {
    this.tabIndex = this.selectedTabIndex();
  }

  onTabChanged($event: any) {
    switch ($event.index) {
      case 0:
        this._router.navigate(['']);
        break;
      case 1:
        this._router.navigate(['movies']);
        break;
      default:
        break;
    }
  }
}
