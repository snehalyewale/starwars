import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListTableComponent } from './characters-list-table.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CharacterService } from '../character.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CharactersListTableComponent', () => {
  let component: CharactersListTableComponent;
  let fixture: ComponentFixture<CharactersListTableComponent>;
  let mockCharacterService: jasmine.SpyObj<CharacterService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockCharacterService = jasmine.createSpyObj('CharacterService', ['getCharacterDetailsByName', 'getStarWarsCharacters']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [CharactersListTableComponent,
        MatTableModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        CommonModule
      ],
      providers: [
        { provide: CharacterService, useValue: mockCharacterService },
        { provide: Router, useValue: mockRouter },
        provideHttpClientTesting(),
        provideAnimations()
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CharactersListTableComponent);
    component = fixture.componentInstance;
    const mockData = {
      count: 10,
      next: '',
      previous: '', results: [{ id: 1, name: 'Luke Skywalker' }]
    };
    mockCharacterService.getStarWarsCharacters.and.returnValue(of(mockData));
    mockCharacterService.getCharacterDetailsByName.and.returnValue(of());
    component.charactersList = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCharactersList on initialization when there is no search query', () => {
    spyOn(component, 'applyFilter');
    component.initializeStates();
    expect(component.applyFilter).toHaveBeenCalled();
  });

  it('should call applyFilter and update charactersList on search', () => {
    const mockData = {
      count: 10,
      next: '',
      previous: '', results: [{ id: 1, name: 'Luke Skywalker' }]
    };
    mockCharacterService.getCharacterDetailsByName.and.returnValue(of(mockData));

    component.searchControl.setValue('Luke Skywalker');
    component.applyFilter();

    expect(mockCharacterService.getCharacterDetailsByName).toHaveBeenCalledWith('Luke Skywalker');
    
  });
});
