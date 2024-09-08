import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsComponent } from './character-details.component';
import { CharacterService } from '../character.service';
import { FilmsListComponent } from '../../films/films-list/films-list.component';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CharactersListTableComponent } from '../characters-list-table/characters-list-table.component';
import { of } from 'rxjs';
import { Character } from '../character.model';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let mockCharacterService: jasmine.SpyObj<CharacterService>;

  beforeEach(async () => {
    mockCharacterService = jasmine.createSpyObj('CharacterService', ['getCharacterDetails', 'getPlanetNameByCharacter', 'getFilmsDetailsByCharacter']);

    await TestBed.configureTestingModule({
      imports: [CharacterDetailsComponent,
        MatCardModule, MatGridListModule, MatListModule, RouterModule, MatIconModule, FilmsListComponent
      ],
      providers: [
        { provide: CharacterService, useValue: mockCharacterService },
        provideHttpClientTesting(),
        provideRouter([{path: '', component: CharactersListTableComponent}])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    const mockData: Character = {
      id: 1, name: 'Luke Skywalker',
      birth_year: '',
      eye_color: '',
      films: [],
      gender: '',
      hair_color: '',
      height: '',
      homeworld: '',
      mass: '',
      skin_color: '',
      created: '',
      edited: '',
      species: [],
      starships: [],
      url: undefined,
      vehicles: []
    };
    mockCharacterService.getCharacterDetails.and.returnValue(of(mockData));
    mockCharacterService.getFilmsDetailsByCharacter.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
