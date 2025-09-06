import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {DatePipe, NgClass, NgStyle} from "@angular/common";

interface Priority {
  label: string;
  value: string;
}

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule, CalendarModule, DropdownModule, ButtonModule, DatePipe, NgStyle, NgClass],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.css']
})
export class MyTasksComponent {
  taskForm: FormGroup;
  activeTasks: any[] = [];
  expandedTask: any | null = null;

  priorities: Priority[] = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' }
  ];

  constructor() {
    this.taskForm = new FormGroup({
      taskName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      description: new FormControl<string>('', { nonNullable: true }),
      priority: new FormControl<string>('medium', { nonNullable: true }),
      dueDate: new FormControl<Date | null>(null)
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      this.activeTasks.push({ ...this.taskForm.value });
      this.taskForm.reset({ priority: 'medium' });
    }
  }

  get sortedTasks() {
    return [...this.activeTasks].sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
      const dateB = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
      return dateA - dateB;
    });
  }

  getTaskNameColor(dueDate: Date | string | null): string {
    if (!dueDate) return '#000';
    const now = new Date();
    const date = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    const diff = (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    if (diff >= 3) return '#43a047'; // green
    if (diff >= 1) return '#ffa726'; // orange
    return '#e53935'; // red
  }

  toggleExpand(task: any) {
    this.expandedTask = this.expandedTask === task ? null : task;
  }
}
