import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

async post(path:string,body:any){
  let res = await fetch (environment.api_url + path,
    {
      method:"POST",
      headers:
      {
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem("token") || ""
      },
      body:JSON.stringify(body)
    }
  )
  let data =await res.json()
  return data;
}

}
