import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User, UserFilter } from 'interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api : ApiService,
  ) { }

  async authenticate(
    email: string,
    password: string) {
    let body = {
      email: email,
      password: password
    }
    let data = await this.api.post("/user/authenticate", body)
    return data;

  }


  async add(
    fname: string,
    lname:string,
    username:string,
    email:string,
    password:string,
    phone:number,
    alter_phone:number,
    dob:any
  ) {
    let body = {
     fname : fname,
     lname : lname,
     username : username,
     email : email,
     password : password,
     phone : phone,
     alter_phone : alter_phone,
     dob:dob
    }
    let data = await this.api.post("/user/add", body);
    return data;
  }

  async remove(id: number) {
    let data = await this.api.post(
      '/user/remove/' + id,
      {}
    );
  }

  async search(us: UserFilter) {
    let data = await this.api.post(
      "/user/search",
      us
    );
    return data;

  }

  async update(us: User) {
    let data = await this.api.post(
      "/user/update",
      us
    )
  }


}
