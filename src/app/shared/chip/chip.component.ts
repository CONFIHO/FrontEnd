import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.css'],
})
export class ChipComponent implements OnInit {
  @Input() value: boolean = false;
  @Input() name: string = '';
  @Input() formGroup?: FormGroup; 
  @Output() onChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onChangeValue(event: any) {
    this.value = event.target.checked;
    this.onChange.emit(event.target.checked);
  }
}
