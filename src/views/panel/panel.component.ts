import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  isSidebarOpen = true;
  currentTitle = 'Dashboard';

  private titles: { [key: string]: string  } = {
    'dashboard': 'Dashboard',
    'mis-denuncias': 'Mis Denuncias',
    'todas-las-denuncias': 'Todas las denuncias'
  };

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const activeRoute = this.route.firstChild?.snapshot.url[0]?.path;
      this.currentTitle = activeRoute ? this.titles[activeRoute] || 'Dashboard' : 'Dashboard';
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
