import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {UserNameEmail} from '../../services/data/user';
import {MatLabel, MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {AbstractControl, FormControl, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'user-ddselect',
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    ReactiveFormsModule,
    MatOption
  ],
  templateUrl: './user-ddselect.html',
  styleUrl: './user-ddselect.css'
})
export class UserDDSelect implements OnInit, OnChanges{
  @Input() label: string = 'Default text';
  @Input() formControlRef!: AbstractControl;
  @Input() userTable!: UserNameEmail[]
  filteredUsers: UserNameEmail[] = [];
  formControlTyped!: FormControl;


    ngOnInit(): void {
      this.formControlTyped = this.formControlRef as FormControl;
    }

    ngOnChanges(): void{
      this.filteredUsers = [...this.userTable];
    }

  filterUsers(value: string): void {
    const filterValue = value.toLowerCase();

    const matchingUsers = this.userTable.filter(user =>
      user.username.toLowerCase().includes(filterValue) || user.email.toLowerCase().includes(filterValue)
    );

    const selectedUsers: UserNameEmail[] = this.formControlTyped.value || [];

    const combinedMap = new Map<string, UserNameEmail>();

    matchingUsers.forEach(user => combinedMap.set(user.email, user));

    selectedUsers.forEach(user => {
      if (!combinedMap.has(user.email)) {
        combinedMap.set(user.email, user);
      }
    });


    this.filteredUsers = Array.from(combinedMap.values());
  }

  compareUsers(user1: UserNameEmail, user2: UserNameEmail): boolean{
    return user1 && user2 ? user1.email === user2.email : user1 === user2;
  }

}
