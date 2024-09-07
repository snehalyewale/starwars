import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-characters-list-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './characters-list-table.component.html',
  styleUrl: './characters-list-table.component.css'
})
export class CharactersListTableComponent {

  @Input() charactersList: any;
  displayedColumns = ['name', 'birthYear', 'gender'];

  constructor() {}
}
