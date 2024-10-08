import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const URL_BACKEND = "http://localhost:8080/33892962/Massimo/api/v1";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return this.http.get(URL_BACKEND+'/authenticated');
  }

  getDrivers() {
    return this.http.get(URL_BACKEND+'/drivers');
  }

  getDriverPackages() {
    return this.http.get(URL_BACKEND+'/driverspackages');
  }

  getDriver(id: number) {
    return this.http.get(URL_BACKEND+'/drivers?id='+id);
  }

  addDriver(driver: any) {
    return this.http.post(URL_BACKEND+'/drivers/add', driver);
  }

  updateDriver(driver: any) {
    return this.http.put(URL_BACKEND+'/drivers', driver);
  }

  deleteDriver(id: number) {
    return this.http.delete(URL_BACKEND+'/drivers/delete', {
      ...httpOptions,
      body: { driverId: id }
    });
  }

  getPackages() {
    return this.http.get(URL_BACKEND+'/packages');
  }

  getPackage(id: number) {
    return this.http.get(URL_BACKEND+'/packages?id='+id);
  }

  addPackage(pkg: any) {
    return this.http.post(URL_BACKEND+'/packages', pkg);
  }

  updatePackage(pkg: any) {
    return this.http.put(URL_BACKEND+'/packages', pkg);
  }

  deletePackage(id: number) {
    return this.http.delete(URL_BACKEND+'/packages/delete', {
      ...httpOptions,
      body: { packageId: id }
    });
  }

  getStatistics() {
    return this.http.get(URL_BACKEND+'/statistics');
  }

  login(username: string, password: string) {
    return this.http.post(URL_BACKEND+'/login', { username, password });
  }

  signUp(username: string, password: string) {
    return this.http.post(URL_BACKEND+'/signup', { username, password });
  }
}
