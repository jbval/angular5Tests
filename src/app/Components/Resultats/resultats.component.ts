import { Component, OnInit } from '@angular/core';
import { ResultatModel } from '../../Models/resultat.model';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid/main';
import * as _ from 'underscore';
import { ResultatsService } from '../../Services/resultats.service';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})

export class ResultatsComponent implements OnInit {
  resultatsFiltered: ResultatModel[];
  tournois: string[];
  private resultats: ResultatModel[];

  constructor(private resultatsServiceDependency: ResultatsService) {

  }

  ngOnInit():void {
    this.fetchResultats();
  }

  private fetchResultats():void {
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
      const joueurConsolide: ResultatModel = {
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
