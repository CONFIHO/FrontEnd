import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() titles: string[] = [];
  @Input() page: number = 0;
  @Input() per_page: number = 0;
  @Input() total: number = 0;
  @Output() onChange : EventEmitter<{page: number, per_page: number}> = new EventEmitter()

  constructor() {}

  ngOnInit(): void {}

  handlePageEvent($event: PageEvent) {
    this.onChange.emit({
      page: $event.pageIndex,
      per_page: $event.pageSize
    })
  }
}
