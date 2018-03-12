import { Component, OnInit } from '@angular/core';
import { Resultat } from '../../Models/ResultatsVO';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';
import * as _ from 'underscore';
import { ResultatsService } from '../../Services/resultatsService';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})

export class ResultatsComponent implements OnInit {
  resultatsFiltered: Resultat[];

  tournois: string[];
  resultats: Resultat[];
  constructor(private resultatsServiceDependency: ResultatsService) {}

  ngOnInit():void {
    this.fetchResultats();
  }

  fetchResultats(): void {
    this.resultatsServiceDependency.getResultats().subscribe(resultat => {
      this.resultats = resultat;
      this.tournois = _.union(
        ['TOUS'],
        _.uniq(_.map(this.resultats, r => r.Tournoi))
      );
      this.refreshResultats('TOUS');
    });
  }
  public refreshResultats(selectedTournoi: string): void {
    if (selectedTournoi === 'TOUS') {
      this.resultatsFiltered = this.resultats;
    } else {
      this.resultatsFiltered = _.where(this.resultats, {
        Tournoi: selectedTournoi
      });
    }
    const joueursGroupes = _.groupBy(this.resultatsFiltered, 'Licence');
    this.resultatsFiltered = [];
    _.each(joueursGroupes, (joueursParNom, numLicence) => {
      const currentJoueur = joueursParNom[0];
      const pointsTotalJoueur = joueursParNom.map(j => j.Points);
      const sumJoueur = _.reduce(
        pointsTotalJoueur,
        (memo: number, joueur: number) => {
          return memo + joueur;
        }
      );
      const joueurConsolide: Resultat = {
        NomJoueur: currentJoueur.NomJoueur,
        Points: sumJoueur,
        Club: currentJoueur.Club,
        Tournoi: selectedTournoi,
        Licence: currentJoueur.Licence
      };
      this.resultatsFiltered.push(joueurConsolide);
    });
    this.resultatsFiltered = _.sortBy(
      this.resultatsFiltered,
      r => r.Points
    ).reverse();
  }
}
