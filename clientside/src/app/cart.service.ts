import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  private cartsURL = 'http://localhost:3000/api/cart/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // Retrieving Carts Service
  getCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.cartsURL);
  }

  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>(this.cartsURL, cart, this.httpOptions).pipe(
      tap((newCart: Cart) => this.log(`added to cart!`)),
      catchError(this.handleError<Cart>('addCart'))
    );
  }

  // Deleting note through
  deleteCart(_id: number): Observable<Cart> {
    const url = `${this.cartsURL}${_id}`;

    return this.http.delete<Cart>(url, this.httpOptions);
  }

  // Excerpt from the documentations.
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
