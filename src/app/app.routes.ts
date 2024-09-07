import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: ()=> import('./star-characters/character.module').then(m=> m.CharacterModule)
    }
];
