import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CharacterService } from '../character.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-list-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule, CommonModule],
  templateUrl: './characters-list-table.component.html',
  styleUrl: './characters-list-table.component.css',
})
export class CharactersListTableComponent implements OnInit {

  charactersList: any;
  displayedColumns = ['name', 'birthYear', 'gender', 'action'];
  searchControl = new FormControl('')
  loading = false;
  subscription!: Subscription;
  characterListLength: any;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private router: Router, private characterService: CharacterService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initializeStates();
    this.loadFavorites();
  }

  applyFilter() {
    if (this.searchControl.value && this.searchControl.value !== '') {
      localStorage.setItem('searchQuery', this.searchControl.value);
      this.loading = true;
      this.characterService.getCharacterDetailsByName(this.searchControl.value).subscribe(data => {
        this.charactersList = data['results'];
        console.log(this.charactersList);
        this.loading = false;
      }, error => {
        this.loading = false;
        console.log(error);
      });
    } else {
      localStorage.setItem('searchQuery', '');
      this.getCharactersList();
    }
  }

  getCharactersList() {
    this.loading = true;
    this.subscription = this.characterService.getStarWarsCharacters().subscribe(data => {
      if (data) {
        this.charactersList = data['results'];
        this.characterListLength = data['count'];
        this.charactersList.paginator = this.paginator;
        this.loading = false;
        console.log(data)
      }
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  viewCharacterDetails(id: any) {
    this.router.navigate(['/character', id]);
  }

  initializeStates(): void {
    // Restore saved search query
    const savedSearch = localStorage.getItem('searchQuery');
    const savedPageIndex = localStorage.getItem('pageIndex');
    const savedPageSize = localStorage.getItem('pageSize');
    if (savedSearch) {
      this.searchControl.setValue(savedSearch);
      this.applyFilter();
    } else if (savedPageIndex && savedPageSize) {
      this.paginator.pageIndex = parseInt(savedPageIndex, 10);
      this.paginator.pageSize = parseInt(savedPageSize, 10);
      this.savePaginatorState(+savedPageIndex, +savedPageSize);
      this.getPageData(+savedPageIndex + 1);
    } else {
      this.getCharactersList();
    }
    // Restore pagination data after loading results
    this.paginator.pageIndex = parseInt(localStorage.getItem('pageIndex') || '0', 10);
    this.paginator.pageSize = parseInt(localStorage.getItem('pageSize') || '10', 10);
  }

  savePaginatorState(pageIndex: number, pageSize: number): void {
    // Save pagination state
    localStorage.setItem('pageIndex', pageIndex.toString());
    localStorage.setItem('pageSize', pageSize.toString());
  }

  pageData(event: PageEvent) {
    this.savePaginatorState(event.pageIndex, event.pageSize);
    if (event.pageIndex === 0) {
      localStorage.setItem('pageIndex', '');
      localStorage.setItem('pageSize', '');
    } else {
      this.savePaginatorState(event.pageIndex, event.pageSize);
    }
    this.getPageData(event.pageIndex + 1);
  }

  getPageData(pageIndex: number) {
    this.loading = true;
    this.subscription = this.characterService.getStarWarsCharacters(pageIndex).subscribe(data => {
      if (data) {
        this.charactersList = data['results'];
        this.characterListLength = data['count'];
        this.loading = false;
      }
    }, error => {
      console.log(error);
      this.loading = false;
    })
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Toggle favorite status
  toggleFavorite(id: number): void {
    let favorites = this.getFavorites();
    if (favorites.includes(id)) {
      favorites = favorites.filter(favId => favId !== id);
    } else {
      favorites.push(id);
    }
    this.saveFavorites(favorites);
  }

  // Check if the item is favorited
  isFavorite(id: number): boolean {
    return this.getFavorites().includes(id);
  }

  // Save favorite IDs to localStorage
  private saveFavorites(favorites: number[]): void {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }

  // Load favorite IDs from localStorage
  private loadFavorites(): void {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    // Assuming dataSource data is already set; this is just an example
    this.charactersList.forEach((item: any) => {
      item.isFavorite = favorites.includes(item.id);
    });
  }

  // Get favorite IDs from localStorage
  private getFavorites(): number[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }
}
