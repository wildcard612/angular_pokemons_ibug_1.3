import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonList {
  count: number;
  next: string;
  previous: string;
  results: PokemonListItem[];
}

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons$!: Observable<PokemonListItem[]>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemons$ = this.http.get<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=20').pipe(
      map(response => {
        return response.results;
      })
    );
  }
}
