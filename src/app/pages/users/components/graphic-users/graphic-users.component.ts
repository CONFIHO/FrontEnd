import { Component, OnInit } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { userStore } from 'src/app/pages/users.store';

@Component({
  selector: 'app-graphic-users',
  templateUrl: './graphic-users.component.html',
  styleUrls: ['./graphic-users.component.css']
})
export class GraphicUsersComponent implements OnInit {

  single: any[] = [
    {
      "name": "Administradores",
      "value": 10
    },
    {
      "name": "Consumidores",
      "value": 20
    }
  ];
  view: [number, number] = [450, 450];

  legend: boolean = true;
  legendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a8385d', '#5107AF']
  };

  constructor() { }

  ngOnInit(): void {  }

}
