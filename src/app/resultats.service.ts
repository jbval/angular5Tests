import { Injectable } from '@angular/core';
import { Resultat } from './Resultats';
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResultatsService {

  constructor( private http: HttpClient) { 

  }

 
  getResultats(): Observable<Resultat[]> {
      return this.http.get<Resultat[]>("/assets/data/resultats.json")
      .pipe(
        catchError(this.handleError('getResultats', []))
      );
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
