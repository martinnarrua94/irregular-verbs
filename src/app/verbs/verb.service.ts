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

        if (meanings["verb"]){
          meanings["verb"].forEach((verb: IVerb) => {
            result.push(verb);
          });
        }
        if (meanings["intransitive verb"]){
          meanings["intransitive verb"].forEach((verb: IVerb) => {
            result.push(verb);
          });
        }
        if (meanings["transitive verb"]){
          meanings["transitive verb"].forEach((verb: IVerb) => {
            result.push(verb);
          });
        }
        
        return result;
      }),
      catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
}
}
