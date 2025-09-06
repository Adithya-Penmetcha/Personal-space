import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {RouterOutlet} from "@angular/router";
import {TabMenuModule} from "primeng/tabmenu";

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    RouterOutlet,
    TabMenuModule
  ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent implements OnInit{
  items: MenuItem[] = [];
  activeItem: MenuItem | undefined;

  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: '/home' },
      { label: 'My Tasks', icon: 'pi pi-check-square', routerLink: '/tasks' },
      { label: 'Profile', icon: 'pi pi-user', routerLink: '/profile' }
    ];

    this.activeItem = this.items[0];
  }
}
