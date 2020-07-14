import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVerbTenses } from '../models/verbTenses';
import { map, catchError } from 'rxjs/operators';
import { IVerb } from '../models/verb';
import { IMeaning } from '../models/meaning';
import { IApiResponse } from '../models/apiResponse';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private verbTensesUrl = 'assets/verbs.json';

  private dictionaryUrl = 'https://api.dictionaryapi.dev/api/v1/entries/en/';

  constructor(private http: HttpClient) { }

  getVerbs(): Observable<IVerbTenses[]>{
    return this.http.get<IVerbTenses[]>(this.verbTensesUrl);
  }

  getDefinition(verb: string): Observable<IVerb[]>{
    return this.http.get<IApiResponse[]>(this.dictionaryUrl+verb)
    .pipe(
      map(response =>{
        let meanings: IMeaning = response[0].meaning;
        let result: IVerb[] = [];

        const verbKeys: string[] = [];

        Object.keys(meanings).forEach(key => {
          if (key.includes('verb')) {
            verbKeys.push(key)
          }  
        })

        verbKeys.forEach(key =>{
          meanings[key].forEach((verb: IVerb) => {
            result.push(verb);
          });
        })
        
        return result;
      }),
      catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
}
}
