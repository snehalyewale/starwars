import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CharacterService } from '../../star-characters/character.service';
import { Subscription } from 'rxjs';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-films-list',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './films-list.component.html',
  styleUrl: './films-list.component.css',
})
export class FilmsListComponent implements OnInit {

  @Input() filmUrls: any;
  subscription!: Subscription;
  filmDetails!: any;
  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.subscription =  this.characterService.getFilmsDetailsByCharacter(this.filmUrls).subscribe(data=>{
      if(data) {
        this.filmDetails = data;
        console.log(this.filmDetails);
      }
    }, error=>{
      console.log(error);
    })
  }
}
