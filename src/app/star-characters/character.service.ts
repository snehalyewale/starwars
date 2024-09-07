import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from './character.model';
import { People } from './people.model';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClint: HttpClient) { }

  getStarWarsCharacters(pageNumber =1): Observable<People<Character>> {
    return this.httpClint.get<People<Character>>(`http://swapi.dev/api/people/?page=${pageNumber}`).pipe(map(character=>{
      character.results.forEach(char => {
        char.id = this.getCharacterId(char.url);
      });
      return character;
    }));
  }

  getCharacterId(url: string) {
    return +(url.charAt(url.length-2));
  }
}
