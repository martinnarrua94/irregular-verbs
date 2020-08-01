import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IVerbTenses } from 'src/app/models/verbTenses';

@Component({
  selector: 'app-verb-filter',
  templateUrl: './verb-filter.component.html',
  styleUrls: ['./verb-filter.component.css']
})
export class VerbFilterComponent {

  letters: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ALL' ]

  @Input() dataSource = new MatTableDataSource<IVerbTenses>();
  @Input() originalDataSource = new MatTableDataSource<IVerbTenses>();

  @Output() dataSourceEvent = new EventEmitter<MatTableDataSource<IVerbTenses>>();

  constructor() { }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceHasChanged();
  }

  startsWith(event: Event){
    const filterValue = (event.target as HTMLInputElement).textContent;

    switch (filterValue) {
      case "ALL":
        this.dataSource = this.originalDataSource;
        this.dataSourceHasChanged();
        break;

      case null:
        break;

      default:
        this.dataSource = new MatTableDataSource<IVerbTenses>();
        this.originalDataSource.data.forEach(verb => {
          if (verb.base.indexOf(filterValue.toLowerCase()) === 0) {
            this.dataSource.data.push(verb);
          }
        });
        this.dataSourceHasChanged();
        break;
    }  
  }

  dataSourceHasChanged() {
    this.dataSourceEvent.emit(this.dataSource);
  }

}
