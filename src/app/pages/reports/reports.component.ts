import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { userStore } from '../users.store';
import { Rol } from 'src/app/models/Rol';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  pie: any[] = [];

  actives: any[] = [];

  multi2: any[] = [];

  multi: any[] = [];

  view: [number, number] = [450, 450];
  range = this.fb.group({
    start: new FormControl<string>(
      moment(new Date()).add(-8, 'days').format('YYYY-MM-DD')
    ),
    end: new FormControl<string>(moment().format('YYYY-MM-DD')),
  });
  searching: boolean = false;
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
    domain: ['#a8385d', '#5107AF'],
  };

  colorSchemeActives: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#17A100', '#FF6767'],
  };
  users$!: Subscription;

  colorSchemeCategories: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#13BF6D', '#4478C1', '#FFD180', '#D674B6', '#00A1AE'],
  };

  //alim, estudio, hogar, ropa, personal

  constructor(private userStore: userStore, private fb: FormBuilder) {}

  ngOnInit(): void {
    (async () => {
      this.userStore.setFilters({filterState: '', filterUser: ''});
      await this.userStore.fetchUsers();
      this.users$ = this.userStore.userList$.subscribe((userList) => {
        this.getGraphics(userList);
      });
      await this.getDateGraphics();
    })();
  }

  async getDateGraphics() {
    await this.userStore.fetchConsumptionReport(
      this.range.value as { start: string | null; end: string | null }
    );
    const consumptionReport = this.userStore.consumptionReport;
    this.multi2 = [
      {
        name: 'Consumo',
        series: consumptionReport.map((consumption) => ({
          name: moment.utc(consumption.expense_date).format('DD/MM/YYYY'),
          value: consumption._sum.value,
        })),
      },
    ];

    await this.userStore.fetchCategoriesExpensesReport(
      this.range.value as { start: string | null; end: string | null }
    );
    const categoriesExpensesReport = this.userStore.categoriesExpensesReport;

    let countFood = 0;
    let countStudy = 0;
    let countHome = 0;
    let countClothes = 0;
    let countPersonal = 0;

    for (const consumption of categoriesExpensesReport) {
      switch (consumption.category_id) {
        case 1:
          countFood = consumption._count.id;
          break;
        case 2:
          countStudy = consumption._count.id;
          break;
        case 3:
          countHome = consumption._count.id;
          break;
        case 4:
          countClothes = consumption._count.id;
          break;
        case 5:
          countPersonal = consumption._count.id;
          break;
      }
    }

    this.multi = [
      {
        name: 'Alimentación',
        value: countFood,
      },
      {
        name: 'Estudio',
        value: countStudy,
      },
      {
        name: 'Hogar',
        value: countHome,
      },
      {
        name: 'Ropa',
        value: countClothes,
      },
      {
        name: 'Personal',
        value: countPersonal,
      },
    ];
  }

  private getGraphics(userList: User[]) {
    const graphicCounts = userList.reduce(
      (acc, curr) => {
        if (curr.rol === Rol.ADMIN) {
          acc.adminCount++;
        } else if (curr.rol === Rol.CONSUMMER) {
          acc.consummerCount++;
        }
        if (curr.enabled == true) {
          acc.activeCount++;
        } else {
          acc.inactiveCount++;
        }
        return acc;
      },
      { adminCount: 0, consummerCount: 0, activeCount: 0, inactiveCount: 0 }
    );
    this.pie = [
      {
        name: 'Administradores',
        value: graphicCounts.adminCount,
      },
      {
        name: 'Consumidores',
        value: graphicCounts.consummerCount,
      },
    ];
    this.actives = [
      {
        name: 'Activos',
        value: graphicCounts.activeCount,
      },
      {
        name: 'Inactivos',
        value: graphicCounts.inactiveCount,
      },
    ];
  }
}
