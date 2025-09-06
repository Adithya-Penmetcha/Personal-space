import {Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import {CalendarModule} from "primeng/calendar";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CalendarModule,TabMenuModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

}
