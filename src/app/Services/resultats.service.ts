import { Injectable } from '@angular/core';
import { ResultatModel } from '../Models/resultat.model';
import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResultatsService {
  private urlDocGoogle:string='https://spreadsheets.google.com/feeds/list/15ytgQiUCdIgBDverpk9o3s786va4DREBPuZweCpyUjM/od6/public/values?alt=json';

  constructor( private http: HttpClient) {

  }
  parseRow(row:Object):ResultatModel{
    var resultat=new ResultatModel();
    resultat.NomJoueur=row['gsx$joueur']['$t'];
    resultat.Club=row['gsx$club']['$t'];
    resultat.Licence=row['gsx$licence']['$t'];
    resultat.Points=parseInt(row['gsx$points']['$t']);
    resultat.Tournoi=row['gsx$tournoi']['$t'];
    return resultat;
  };

  getResultats(): Observable<ResultatModel[]> {
    var resultatsFromSheet=this.http.get(this.urlDocGoogle)
    .pipe(
      map((rows,idx)=>{
        var entries=rows['feed']['entry'];
        var items=entries.map(e=>this.parseRow(e));
        return items;
      })
    );
    return resultatsFromSheet;
  }

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
   // this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


}
