import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVerbTenses } from '../models/verbTenses';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private verbTensesUrl = 'assets/verbs.json';

  constructor(private http: HttpClient) { }

  getVerbs(): Observable<IVerbTenses[]>{
    return this.http.get<IVerbTenses[]>(this.verbTensesUrl);
  }
}
