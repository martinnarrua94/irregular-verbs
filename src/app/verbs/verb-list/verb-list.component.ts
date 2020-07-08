import { Component, OnInit } from '@angular/core';
import { IVerbTenses } from '../../models/verbTenses';
import { VerbService } from '../verb.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})

export class VerbListComponent implements OnInit {

  verbs: IVerbTenses[] = [];
  displayedColumns: string[] = ['base', 'pastSimple', 'pastParticiple'];
  letters: string[] = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','ALL' ]
  
  dataSource = new MatTableDataSource<IVerbTenses>();
  originalDataSource = new MatTableDataSource<IVerbTenses>();
  
  constructor(private verbService: VerbService) { }

  ngOnInit(): void {
     this.verbService.getVerbs().subscribe({
       next: verbs => {
         this.originalDataSource = new MatTableDataSource<IVerbTenses>(verbs);
         this.dataSource = this.originalDataSource;
       }
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  startsWith(event: Event){
    const filterValue = (event.target as HTMLInputElement).textContent;

    switch (filterValue) {
      case "ALL":
        this.dataSource = this.originalDataSource;
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
        break;
    }  
  }
}