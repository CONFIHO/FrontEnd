import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material.module';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { UsersComponent } from './users/users.component';
import { GraphicUsersComponent } from './users/components/graphic-users/graphic-users.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UserInfoComponent } from './users/components/user-info/user-info.component';
import { userStore } from './users.store';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  declarations: [
    LoginComponent,
    MenuComponent,
    UsersComponent,
    GraphicUsersComponent,
    UserInfoComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    NgxChartsModule,
  ],
  providers: [],
})
export class PagesModule {}
