import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVerbTenses } from '../models/verbTenses';
import { tap } from 'rxjs/operators';

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

  getDefinition(verb: string): Observable<any[]>{
    return this.http.get<any[]>(this.dictionaryUrl+verb)
    .pipe(
      tap(response =>{
        let result = response[0];
        result.meaning.intransitiveVerb = result.meaning["intransitive verb"];
        return result;
      }));
  }
}
