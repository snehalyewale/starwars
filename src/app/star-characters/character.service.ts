import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Character } from './character.model';
import { People } from './people.model';

export const SWAPI_BASE_URL = 'https://swapi.dev/api';
const CHARACTER_HTTP_URL_LENGTH = `${SWAPI_BASE_URL}/people/`.length;

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private httpClint: HttpClient) { }

  getStarWarsCharacters(pageNumber =1): Observable<People<Character>> {
    return this.httpClint.get<People<Character>>(`${SWAPI_BASE_URL}/people/?page=${pageNumber}`).pipe(map(character=>{
      character.results.forEach(char => {
        char.id = this.getCharacterId(char.url);
      });
      return character;
    }));
  }

  getCharacterId(url: string) {
    return parseInt(url.substring(CHARACTER_HTTP_URL_LENGTH, url.length - 1));
  }

  getCharacterDetails(characterId: number): Observable<Character> {
    return this.httpClint.get<Character>(`${SWAPI_BASE_URL}/people/${characterId}`);
  }

  getFilmsDetailsByCharacter(films: any) {
    const requests = films.map((film: string) => this.httpClint.get(film));
    return forkJoin(requests).pipe(
      map((responses: any) => {
        return responses.flat();
      })
    );
  }

  getPlanetNameByCharacter(homeworld: string): Observable<any> {
    return this.httpClint.get(homeworld);
  }

  getCharacterDetailsByName(name: string): Observable<People<Character>> {
    return this.httpClint.get<People<Character>>(`${SWAPI_BASE_URL}/people/?search=${name}`).pipe(map(character=>{
      character.results.forEach(char => {
        char.id = this.getCharacterId(char.url);
      });
      return character;
    }));
  }
}
