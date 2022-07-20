import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  private productsURL = 'http://localhost:3000/api/products/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Retrieving Products Service
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsURL);
  }

  // Adding Products
  addProduct(newProduct: any){
    var headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.productsURL, newProduct, {headers:headers})
      .pipe(map((response: any) => response.json()));
  }

  // Deleting note through
  deleteProduct(_id: number): Observable<Product> {
    const url = `${this.productsURL}${_id}`;

    return this.http.delete<Product>(url, this.httpOptions);
  }
}
