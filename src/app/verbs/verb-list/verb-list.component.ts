import { Component, OnInit, ViewChild } from '@angular/core';
import { IVerb } from '../verb';
import { VerbService } from '../verb.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-verb-list',
  templateUrl: './verb-list.component.html',
  styleUrls: ['./verb-list.component.css']
})

export class VerbListComponent implements OnInit {

  verbs: IVerb[] = [];
  displayedColumns: string[] = ['base', 'pastSimple', 'pastParticiple'];
  
  dataSource = new MatTableDataSource<IVerb>();
  
  constructor(private verbService: VerbService) { }

  ngOnInit(): void {
     this.verbService.getVerbs().subscribe({
       next: verbs => {
         this.dataSource = new MatTableDataSource<IVerb>(verbs);      
       }
     });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
