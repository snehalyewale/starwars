import { Routes } from '@angular/router';
// import { CharactersListComponent } from './characters-list/characters-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { CharactersListTableComponent } from './characters-list-table/characters-list-table.component';

export const routes: Routes = [
    {
        path: '',
        component: CharactersListTableComponent
    },
    {
        path: 'character/:characterId',
        component: CharacterDetailsComponent
    }
];
