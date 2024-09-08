import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsListComponent } from './films-list.component';
import { CharacterService } from '../../star-characters/character.service';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FilmsListComponent', () => {
  let component: FilmsListComponent;
  let fixture: ComponentFixture<FilmsListComponent>;
  let mockCharacterService: jasmine.SpyObj<CharacterService>;

  beforeEach(async () => {
    mockCharacterService = jasmine.createSpyObj('CharacterService', ['getFilmsDetailsByCharacter']);

    await TestBed.configureTestingModule({
      imports: [FilmsListComponent, MatListModule],
      providers: [
        { provide: CharacterService, useValue: mockCharacterService },
        provideHttpClientTesting(),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsListComponent);
    component = fixture.componentInstance;
    mockCharacterService.getFilmsDetailsByCharacter.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
