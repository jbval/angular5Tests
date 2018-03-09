import { Component, OnInit } from '@angular/core';
import { Resultat } from '../Resultats';
import { ColumnApi, GridApi, GridOptions } from "ag-grid/main";
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

  ngOnInit() {
  }


  refreshResultats: Function = (selectedTournoi) => {

    if (selectedTournoi === "TOUS") {
      this.resultatsFiltered = this.resultats;
    } else {
      this.resultatsFiltered = _.where(this.resultats, { Tournoi: selectedTournoi });
    }
    var joueursGroupes = _.groupBy(this.resultatsFiltered, "Joueur");
    this.resultatsFiltered = [];
    _.each(joueursGroupes, (joueursParNom, joueurParNom) => {
      var currentJoueur = joueursParNom[0];
      var pointsTotalJoueur = joueursParNom.map(j => j.Points);
      var sumJoueur = _.reduce(pointsTotalJoueur, (memo: number, joueur: number) => {
        return memo + joueur;
      });
      this.resultatsFiltered.push({ Joueur: joueurParNom, Points: sumJoueur, Club: currentJoueur.Club, Tournoi: selectedTournoi })
    });
    this.resultatsFiltered=_.sortBy(this.resultatsFiltered,r=>r.Points).reverse();

  };

  resultatsFiltered: Resultat[];

  tournois: string[];
  resultats: Resultat[] = [
    {
      Joueur: 'Joueur1',
      Tournoi: 'Tournoi1',
      Points: 10,
      Club: 'ATR'
    },
    {
      Joueur: 'Joueur2',
      Tournoi: 'Tournoi1',
      Points: 5,
      Club: 'ATR'
    },
    {
      Joueur: 'Joueur2',
      Tournoi: 'Tournoi2',
      Points: 10,
      Club: 'ATR'
    }
  ];

  // columnDefs=[

  //   {headerName: "Joueur", field: "Joueur"},
  //   {headerName: "Tournoi", field: "Tournoi"},
  //   {headerName: "Points", field: "Points"},
  //   {headerName: "Club", field: "Club"}
  // ];
}
