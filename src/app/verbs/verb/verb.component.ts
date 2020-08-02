import { Component, OnInit } from '@angular/core';
import { IVerbTenses } from 'src/app/models/verbTenses';
import { VerbService } from '../verb.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.css']
})
export class VerbComponent implements OnInit {

  verbs: IVerbTenses[] = [];
  originalVerbs: IVerbTenses[] = [];

  constructor(private verbService: VerbService) { }

  ngOnInit(): void {
    this.verbService.getVerbs().subscribe({
      next: verbs => {    
        this.originalVerbs = verbs;
        this.verbs =  verbs;
      }
    });   
  }

  verbsHaveChanged($event: IVerbTenses[]) {
    this.verbs = $event;
  }

  resetVerbs() {
    this.verbs = this.originalVerbs;
  }

}
