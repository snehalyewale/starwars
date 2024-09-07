import { Routes } from '@angular/router';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';

export const routes: Routes = [
    {
        path: '',
        component: CharactersListComponent
    },
    {
        path: 'character/:characterId',
        component: CharacterDetailsComponent
    }
];
