import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  postEmp(data: any) {
    return this.http.post("https://empdb-de6af-default-rtdb.firebaseio.com/data.json/", data);
  }

  getEmp() {
    return this.http.get("https://empdb-de6af-default-rtdb.firebaseio.com/data.json");
  }

  putEmp(data: any, id: number) {
    return this.http.put("https://empdb-de6af-default-rtdb.firebaseio.com/data.json/" + id, data);
  }

  deleteEmp(id: number) {
    return this.http.delete("https://empdb-de6af-default-rtdb.firebaseio.com/data.json/" + id);
  }
}
