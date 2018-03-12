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
import {ResultatsService} from "../resultats.service";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit {

  constructor(private resultatsService :ResultatsService ) {
  

  }

  ngOnInit() {
    this.fetchResultats();
  }

  fetchResultats():void{
      this.resultatsService.getResultats().subscribe(resultat=>{
        this.resultats=resultat;
        this.tournois = _.union(["TOUS"], _.uniq(_.map(this.resultats, (r) => r.Tournoi)));
        this.refreshResultats("TOUS");
      });
      
  };
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
  resultats: Resultat[] ;
}
