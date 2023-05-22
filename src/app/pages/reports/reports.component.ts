import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent{

  pie: any[] = [
    {
      "name": "Administradores",
      "value": 21
    },
    {
      "name": "Consumidores",
      "value": 30
    },
  ];

  actives: any[] = [
    {
      "name": "Activos",
      "value": 51
    },
    {
      "name": "Inactivos",
      "value": 3
    },
  ];

  multi2 : any[] = [
    {
      "name": "Germany",
      "series": [
        {
          "name": "13",
          "value": 12000000
        },
        {
          "name": "14",
          "value": 25000000
        },
        {
          "name": "15",
          "value": 10000000
        },
        {
          "name": "18",
          "value": 35000000
        },
        {
          "name": "21",
          "value": 5000000
        }
      ]
    },
  ];

  multi: any[] = [
    {
      "name": "Consumidores",
      "series": [
        {
          "name": "13",
          "value": 12
        },
        {
          "name": "18",
          "value": 13
        },
        {
          "name": "21",
          "value": 14
        }
      ]
    },
  
    {
      "name": "Administradores",
      "series": [
        {
          "name": "13",
          "value": 21
        },
        {
          "name": "18",
          "value": 22
        },
        {
          "name": "21",
          "value": 23
        }
      ]
    },
  
  ];
  
  view: [number, number] = [450, 450];
  range = new FormGroup({
    start: new FormControl<string>(moment(new Date()).add(-8, 'days').format('YYYY-MM-DD')),
    end: new FormControl<string>(moment().format('YYYY-MM-DD')),
  });
  searching:boolean = false;
  color: ThemePalette = 'accent';

  // options
  gradient: boolean = true;
  showLegend: boolean = false;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: LegendPosition = LegendPosition.Below;

  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a8385d', '#5107AF']
  };

  colorSchemeActives: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#17A100', '#FF6767']
  };

  constructor() {}

}
