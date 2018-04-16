import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../services/user.service';
import { User } from '../../../user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  closeResult: string;
  users: User[];
  current_user: User;
  operation = { is_new: true };

  constructor(private modalService: NgbModal, private userService: UserService) { }

  open(content) {
    if (this.operation.is_new) {
      this.current_user = new User();
    }

    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.ngOnInit();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      this.ngOnInit();
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.getUsers();
  }

  editUser(user: User) {
    this.current_user = user;
    this.operation.is_new = false;
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.json();
      });
  }

  addUser() {
    if (this.operation.is_new) {
      this.userService.addUser(this.current_user)
        .subscribe(res => {
          this.operation.is_new = false;
          this.current_user = new User();
          this.ngOnInit();
        });
      return;
    }
    this.userService.updateUser(this.current_user)
      .subscribe(res => {
        this.current_user = new User();
        this.operation.is_new = true;
        this.ngOnInit();
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(res => {
        this.ngOnInit();
      });
  }

}
