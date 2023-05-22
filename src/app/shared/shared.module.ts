import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LateralBarComponent } from './lateral-bar/lateral-bar.component';
import { MaterialModule } from '../material.module';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { TableComponent } from './table/table.component';
import { ChipComponent } from './chip/chip.component';
import { ModalComponent } from './modal/modal.component';



@NgModule({
  declarations: [
    LateralBarComponent,
    InputTextComponent,
    TableComponent,
    ChipComponent,
    ModalComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule
  ], 
  exports: [
    LateralBarComponent,
    InputTextComponent, 
    TableComponent,
    ChipComponent,
    ModalComponent
  ]
})
export class SharedModule { }
