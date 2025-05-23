import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private URL_BACKEND = location.origin+"/33892962/Massimo/api/v1";

  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return this.http.get(this.URL_BACKEND+'/authenticated');
  }

  getDrivers() {
    return this.http.get(this.URL_BACKEND+'/drivers');
  }

  getDriverPackages() {
    return this.http.get(this.URL_BACKEND+'/driverspackages');
  }

  getDriver(id: number) {
    return this.http.get(this.URL_BACKEND+'/drivers?id='+id);
  }

  addDriver(driver: any) {
    return this.http.post(this.URL_BACKEND+'/drivers/add', driver);
  }

  updateDriver(driver: any) {
    return this.http.put(this.URL_BACKEND+'/drivers', driver);
  }

  deleteDriver(id: number) {
    return this.http.delete(this.URL_BACKEND+'/drivers/delete', {
      body: { driver_id: id }
    });
  }

  getPackages() {
    return this.http.get(this.URL_BACKEND+'/packages');
  }

  getPackage(id: number) {
    return this.http.get(this.URL_BACKEND+'/packages?id='+id);
  }

  addPackage(pkg: any) {
    return this.http.post(this.URL_BACKEND+'/packages/add', pkg);
  }

  updatePackage(pkg: any) {
    return this.http.put(this.URL_BACKEND+'/packages', pkg);
  }

  deletePackage(id: number) {
    return this.http.delete(this.URL_BACKEND+'/packages/delete', {
      body: { package_id: id }
    });
  }

  getStatistics() {
    return this.http.get(this.URL_BACKEND+'/stats');
  }

  login(username: string, password: string) {
    return this.http.post(this.URL_BACKEND+'/login', { username, password });
  }

  signUp(username: string, password: string) {
    return this.http.post(this.URL_BACKEND+'/signup', { username, password });
  }
}
