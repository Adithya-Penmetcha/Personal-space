import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [RouterModule, ButtonModule, CardModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigateByUrl('/');
  }
}
