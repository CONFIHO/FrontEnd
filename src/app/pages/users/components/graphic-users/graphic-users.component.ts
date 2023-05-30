import { Component, OnInit, OnDestroy } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/models/Rol';
import { userStore } from 'src/app/pages/users.store';

@Component({
  selector: 'app-graphic-users',
  templateUrl: './graphic-users.component.html',
  styleUrls: ['./graphic-users.component.css'],
})
export class GraphicUsersComponent implements OnInit, OnDestroy {
  single: any[] = [];
  view: [number, number] = [450, 450];

  legend: boolean = true;
  legendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: '',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#a8385d', '#5107AF'],
  };
  users$!: Subscription;

  constructor(private userStore: userStore) {}

  ngOnInit(): void {
    this.users$ = this.userStore.userList$.subscribe((userList) => {
      const counts = userList.reduce((acc, curr) => {
        if (curr.rol === Rol.ADMIN) {
          acc.adminCount++;
        } else if (curr.rol === Rol.CONSUMMER) {
          acc.consummerCount++;
        }
        return acc;
      }, { adminCount: 0, consummerCount: 0 })
      this.single = [
        {
          name: 'Administradores',
          value: counts.adminCount,
        },
        {
          name: 'Consumidores',
          value: counts.consummerCount,
        },
      ];
    });
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }
}
