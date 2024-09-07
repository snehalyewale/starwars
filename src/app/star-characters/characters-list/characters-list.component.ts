import { Component, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Subscription } from 'rxjs';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CharactersListTableComponent } from '../characters-list-table/characters-list-table.component';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [MatPaginatorModule, CharactersListTableComponent],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent implements OnInit, OnDestroy {

  charactersList: any;
  subscription!: Subscription;
  characterListLength: any;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharactersList();
  }

  getCharactersList() {
    this.subscription = this.characterService.getStarWarsCharacters().subscribe(data => {
      if (data) {
        this.charactersList = data['results'];
        this.characterListLength = data['count'];
        console.log(data)
      }
    }, error => {
      console.log(error)
    })
  }

  pageData(event: PageEvent) {
    this.subscription = this.characterService.getStarWarsCharacters(event.pageIndex + 1).subscribe(data => {
      if (data) {
        this.charactersList = data['results'];
      }
    }, error => {
      console.log(event.pageIndex)
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
