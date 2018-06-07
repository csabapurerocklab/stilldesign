import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../providers/auth.service';
import { UsersService } from '../../providers/users.service';

import { User } from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  accessToken: string;
  id: string;
  title_suffix: string = '';
  user: User;
  editing: boolean = true;
  submit_btn_text: string = 'Update';
  delete_btn_text: string = 'Remove';
  userForm: FormGroup;

  constructor(
      private authService: AuthService,
      private usersService: UsersService,
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder
  ) {
    this.accessToken = this.authService.getToken();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id=='add') {
      this.title_suffix = ' add';
      this.editing = false;
      this.submit_btn_text = 'Add';
    } else {
      console.log('typeof this.id', typeof parseInt(this.id));
      if (typeof parseInt(this.id) !== "number")  this.router.navigate(['/users']);
    }

    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', Validators.required ],
      phone: ['', Validators.required ],
      password: ['', Validators.required ],
      introduction: '',
      position: '',
      status: '0',
    });
  }

  ngOnInit() {
    if (!this.accessToken) this.router.navigate(['/login']);
    if (this.editing) {
      this.usersService.getUser(this.id).subscribe(data => {
        this.user = data.data;
        let name = '';
        name += this.user.firstName ? this.user.firstName : '';
        name += this.user.lastName ? ' '+this.user.lastName : '';
        name.trim();
        this.title_suffix = ' edit';
        this.title_suffix += name!='' ? ' ('+name+')' : '';
        this.userForm.setValue({
           firstName:    this.user.firstName,
           lastName:    this.user.lastName,
           email:    this.user.email,
           phone:    this.user.phone,
           password: ' ',
           introduction:    this.user.introduction,
           position:    this.user.position,
           status:    this.user.status.toString(),
        });
      });
    }
  }

  onSubmit() {
    if (this.editing) {
      this.usersService.updateUser(
            this.user.id,
            this.userForm.value.firstName,
            this.userForm.value.lastName,
            this.userForm.value.email,
            this.userForm.value.phone,
            this.userForm.value.introduction,
            this.userForm.value.position,
            this.userForm.value.status
          ).subscribe(response => {
        console.log('updateUser response',response);
      });
    } else {
      this.usersService.addUser(
            this.userForm.value.firstName,
            this.userForm.value.lastName,
            this.userForm.value.email,
            this.userForm.value.phone,
            this.userForm.value.password,
            this.userForm.value.introduction,
            this.userForm.value.position,
            this.userForm.value.status
          ).subscribe(response => {
        console.log('addUser response',response);
      });
    }
  }

  onRemove() {
    this.usersService.deleteUser(this.user.id).subscribe(response => {
      console.log('deleteUser response',response);
      this.router.navigate(['/users']);
    });
  }
}
