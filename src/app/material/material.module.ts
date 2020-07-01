import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const MaterialComponents = [
  MatMenuModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonToggleModule];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
