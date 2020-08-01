import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IVerbTenses } from 'src/app/models/verbTenses';
import { VerbService } from '../verb.service';

@Component({
  selector: 'app-verb',
  templateUrl: './verb.component.html',
  styleUrls: ['./verb.component.css']
})
export class VerbComponent implements OnInit {

  verbs = new MatTableDataSource<IVerbTenses>();
  originalVerbs = new MatTableDataSource<IVerbTenses>();

  constructor(private verbService: VerbService) { }

  ngOnInit(): void {
    this.verbService.getVerbs().subscribe({
      next: verbs => {    
        this.originalVerbs = new MatTableDataSource<IVerbTenses>(verbs);
        this.verbs = this.originalVerbs;
      }
    });   
  }

  verbsHaveChanged($event: MatTableDataSource<IVerbTenses>) {
    this.verbs = $event;
  }

}
