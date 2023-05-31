import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {

  @Input() placeholder : string = '';
  @Input() icon: string = ''
  @Input() form?: FormGroup
  @Input() name: string = ''
  
  constructor() { }

  ngOnInit(): void {
  }

}
