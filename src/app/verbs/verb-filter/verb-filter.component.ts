import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IVerbTenses } from 'src/app/models/verbTenses';

@Component({
  selector: 'app-verb-filter',
  templateUrl: './verb-filter.component.html',
  styleUrls: ['./verb-filter.component.css']
})
export class VerbFilterComponent {

  letters: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ALL' ]

  @Input() verbs: IVerbTenses[] = [];
  @Input() originalVerbs: IVerbTenses[] = [];

  @Output() filterEvent = new EventEmitter<IVerbTenses[]>();
  @Output() resetEvent = new EventEmitter();

  constructor() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.verbs = this.originalVerbs.filter(x => x.base.includes(filterValue) ||
                                                x.pastSimple.includes(filterValue) ||
                                                x.pastParticiple.includes(filterValue));
    this.verbsHaveChanged();
  }

  clearFilter(){
    this.resetVerbs();
  }

  startsWith(event: Event){
    const filterValue = (event.target as HTMLInputElement).textContent;

    switch (filterValue) {
      case "ALL":
        this.resetVerbs();
        break;

      case null:
        break;

      default:
        this.verbs = [];
        this.originalVerbs.forEach(verb => {
          if (verb.base.indexOf(filterValue.toLowerCase()) === 0) {
            this.verbs.push(verb);
          }
        });
        this.verbsHaveChanged();
        break;
    }  
  }

  verbsHaveChanged() {
    this.filterEvent.emit(this.verbs);
  }

  resetVerbs() {
    this.resetEvent.emit();
  }

}
