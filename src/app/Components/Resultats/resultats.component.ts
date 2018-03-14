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
  tournois: Set<string>;
  selectedTournoi:string;
  private resultats: ResultatModel[];

  /**
   * Crée une nouvelle instance de resultats.component
   * @param resultatsServiceDependency Service de gestion des résultats
   */
  constructor(private resultatsServiceDependency: ResultatsService) {

  }
/**
 * Initialisation du composant
 */
  ngOnInit():void {
    this.initResultats();
  }
/**
 * Récupère l'ensemble des résultats tous tournois confondus
 */
  private initResultats():void {
    this.resultatsServiceDependency.getResultats().subscribe(resultat => {
      this.resultats = resultat;
      
      this.tournois =new Set(['TOUS'].concat(this.resultats.map( r => r.Tournoi)));
      this.refreshResultats('TOUS');
    });
  }
  
/**
 * Rafraichi la liste des résultats en fonction du tournoi courant
 * @param selectedTournoi tournoi sélectionné
 */
  public refreshResultats(selectedTournoi: string): void {
    this.selectedTournoi=selectedTournoi;
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
      this.fillResultatsFiltre(joueursParNom,numLicence,selectedTournoi);
    });

    
    this.resultatsFiltered = _.sortBy(
      this.resultatsFiltered,
      r => r.Points
    ).reverse();
  }

  private fillResultatsFiltre(joueursParNom:ResultatModel[],numLicence:string,selectedTournoi:string):void{
    const currentJoueur:ResultatModel = joueursParNom[0];
    const pointsTotalJoueur = joueursParNom.map(j => j.Points);
    const sumJoueur = pointsTotalJoueur.reduce(
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
}

}
