import {
  Component,
  OnInit
} from '@angular/core';
import {
  Resultat
} from '../Resultats';
import {
  ColumnApi,
  GridApi,
  GridOptions
} from "ag-grid/main";
import * as _ from "underscore";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit {

  constructor() {
    this.tournois = _.union(["TOUS"], _.uniq(_.map(this.resultats, (r) => r.Tournoi)));
    this.refreshResultats("TOUS");

  }

  ngOnInit() {}


  refreshResultats: Function = (selectedTournoi) => {

    if (selectedTournoi === "TOUS") {
      this.resultatsFiltered = this.resultats;
    } else {
      this.resultatsFiltered = _.where(this.resultats, {
        Tournoi: selectedTournoi
      });
    }
    var joueursGroupes = _.groupBy(this.resultatsFiltered, "Licence");
    this.resultatsFiltered = [];
    _.each(joueursGroupes, (joueursParNom, numLicence) => {
      var currentJoueur = joueursParNom[0];
      var pointsTotalJoueur = joueursParNom.map(j => j.Points);
      var sumJoueur = _.reduce(pointsTotalJoueur, (memo: number, joueur: number) => {
        return memo + joueur;
      });
      var joueurConsolide: Resultat = {
        NomJoueur: currentJoueur.NomJoueur,
        Points: sumJoueur,
        Club: currentJoueur.Club,
        Tournoi: selectedTournoi,
        Licence:currentJoueur.Licence
      };
      this.resultatsFiltered.push(joueurConsolide);
    });
    this.resultatsFiltered = _.sortBy(this.resultatsFiltered, r => r.Points).reverse();

  };

  resultatsFiltered: Resultat[];

  tournois: string[];
  resultats: Resultat[] = [{
      NomJoueur: 'Joueur1',
      Licence: '123456',
      Tournoi: 'Tournoi1',
      Points: 10,
      Club: 'ATR'
    },
    {
      NomJoueur: 'Joueur2',
      Tournoi: 'Tournoi1',
      Licence: '123457',
      Points: 5,
      Club: 'ATR'
    },
    {
      NomJoueur: 'Joueur2',
      Tournoi: 'Tournoi2',
      Licence: '123457',
      Points: 10,
      Club: 'ATR'
    }
  ];
}
