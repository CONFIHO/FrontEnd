import { Component, OnInit } from '@angular/core';
import { IModalService } from 'src/app/interfaces/i-modal-service';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { Observable, Subscription } from 'rxjs';
import { userStore } from '../users.store';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  titles: string[] = [
    'Nombre Completo',
    'Correo Electrónico',
    'Rol',
    'Estado',
    '',
  ];

  formFilters: FormGroup = this.fb.group({
    filterUser: [''],
    filterState: ['']
  })

  formSearch: FormGroup = this.fb.group({
    search: ['']
  })

  users$!: Observable<User[]>;
  reload$!: Subscription;

  constructor(
    private modalService: IModalService,
    private userStore: userStore,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    (async () => {
      await this.userStore.fetchUsers();
      this.formFilters.valueChanges.subscribe(form=>{
        this.userStore.setFilters(this.formFilters.value);
      })
      this.users$ = this.userStore.userList$;
      this.reload$ = this.userStore.reload$.subscribe(reload=>{
        if (reload) {
          this.userStore.fetchUsers();
          this.userStore.setReload(false);
        }
      })
    })();
  }

  async search(){
    await this.userStore.fetchUsers(this.formSearch.get('search')?.value)
  }

  cleanFilters(){
    this.formFilters.reset()
  }

  openDialog(name: string, index: number) {
    if (name == 'edit') {
      this.userStore.selectUser(index);
      this.modalService.open(UserInfoComponent);
    } else {
      this.modalService.open(UserInfoComponent);
    }
  }
  
  async updateState(index: number){
    this.userStore.selectUser(index);
    await this.userStore.changeStateUser();
  }
}
