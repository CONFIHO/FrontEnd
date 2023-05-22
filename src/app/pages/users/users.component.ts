import { Component, OnInit } from '@angular/core';
import { IModalService } from 'src/app/interfaces/i-modal-service';
import { UserInfoComponent } from './components/user-info/user-info.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  titles: string[] = [
    'Nombres',
    'Apellidos',
    'Correo Electrónico',
    'Rol',
    'Estado',
    '',
  ];

  constructor(private modalService: IModalService) {}

  ngOnInit(): void {}

  openDialog(name: string){
    if (name == 'edit') {
      this.modalService.open(UserInfoComponent)
    }else{
      this.modalService.open(UserInfoComponent)
    }
  }
}
