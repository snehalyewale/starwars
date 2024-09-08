import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CharacterService } from '../character.service';
import { Subscription } from 'rxjs';
import { Character } from '../character.model';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FilmsListComponent } from '../../films/films-list/films-list.component';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [MatCardModule, MatGridListModule, MatListModule, RouterModule, MatIconModule, FilmsListComponent],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.css'
})
export class CharacterDetailsComponent implements OnInit, OnDestroy {

  @Input() characterId: any;
  subscription!: Subscription;
  characterDetails!: Character;
  planetName!: string;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.subscription = this.characterService.getCharacterDetails(this.characterId).subscribe(data => {
      if (data) {
        this.characterDetails = data;
        this.getHomeWorld(this.characterDetails.homeworld);
        console.log(data);
      }
    }, error => {
      console.log(error);
    })
  }

  getHomeWorld(homeworld: string) {
    this.characterService.getPlanetNameByCharacter(homeworld).subscribe(data => {
      this.planetName = data.name;
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
