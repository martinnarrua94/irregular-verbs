import { Component, Input } from '@angular/core';
import { IVerbTenses } from '../../models/verbTenses';
import { VerbService } from '../verb.service';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { IVerb } from '../../models/verb';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VerbListComponent {

  displayedColumns: string[] = ['base', 'pastSimple', 'pastParticiple'];
  
  @Input() verbs: IVerbTenses[] = [];

  dataSource = new MatTableDataSource<IVerbTenses>();

  expandedElement: string | undefined;

  verbDefinition: IVerb[] | undefined;

  errorMessage = '';
  
  constructor(private verbService: VerbService) {}

  ngOnChanges(): void {   
    this.dataSource = new MatTableDataSource<IVerbTenses>(this.verbs); 
  }

  getDefinition(verb: string){
    this.verbDefinition = undefined;
    this.errorMessage = '';
    this.verbService.getDefinition(verb).subscribe({
      next: verbDefinition => {
        this.verbDefinition = verbDefinition;
      },
      error: err => {
        this.errorMessage = err;
      }
    }); 
  }
}