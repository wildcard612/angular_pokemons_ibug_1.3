import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  pokemon$!: Observable<Pokemon>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.pokemon$ = this.getPokemon(name);
  }

  getPokemon(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      map(response => {
        return {
          name: response.name,
          sprites: {
            front_default: response.sprites.front_default
          },
          height: response.height,
          weight: response.weight
        };
      })
    );
  }
}
