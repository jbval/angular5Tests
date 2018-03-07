import { Component, OnInit } from '@angular/core';
import {Resultat} from '../Resultats';
//import {AgGridModule} from 'ag-grid-angular';
import {ColumnApi, GridApi, GridOptions} from "ag-grid/main";

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.css']
})
export class ResultatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

   
  resultats:Resultat[]=[
    {
      Joueur:'Joueur1',
      Tournoi:'Tournoi1',
      Points:10,
      Club:'ATR'
    },
    {
      Joueur:'Joueur2',
      Tournoi:'Tournoi1',
      Points:5,
      Club:'ATR'
    },
    {
      Joueur:'Joueur2',
      Tournoi:'Tournoi2',
      Points:10,
      Club:'ATR'
    }
  ];

  columnDefs=[

    {headerName: "Joueur", field: "Joueur"},
    {headerName: "Tournoi", field: "Tournoi"},
    {headerName: "Points", field: "Points"},
    {headerName: "Club", field: "Club"}
  ];
}
