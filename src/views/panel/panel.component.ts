import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/resources/services/auth.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  isSidebarOpen = false;
  currentTitle = 'Dashboard';

  private titles: { [key: string]: string  } = {
    'dashboard': 'Dashboard',
    'mis-denuncias': 'Mis Denuncias',
    'todas-las-denuncias': 'Todas las denuncias'
  };

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService) {
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

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/iniciar-sesion']);
  }
}
