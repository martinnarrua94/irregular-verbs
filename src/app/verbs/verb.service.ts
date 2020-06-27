import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVerb } from './verb';

@Injectable({
  providedIn: 'root'
})
export class VerbService {

  private verbUrl = 'assets/verbs.json'

  constructor(private http: HttpClient) { }

  getVerbs(): Observable<IVerb[]>{
    return this.http.get<IVerb[]>(this.verbUrl);
  }
}
