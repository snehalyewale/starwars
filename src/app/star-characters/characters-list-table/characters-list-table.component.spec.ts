import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactersListTableComponent } from './characters-list-table.component';

describe('CharactersListTableComponent', () => {
  let component: CharactersListTableComponent;
  let fixture: ComponentFixture<CharactersListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharactersListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharactersListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
