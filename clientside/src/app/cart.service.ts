import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Cart } from './cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartsURL = 'http://localhost:3000/api/cart';

  // Create a reactive stream of carts
  private cartsSubject = new BehaviorSubject<Cart[]>([]);
  carts$ = this.cartsSubject.asObservable();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private readonly _http: HttpClient) { }

  // Fetch all and push to the stream
  getCarts(): Observable<Cart[]> {
    return this._http.get<Cart[]>(this.cartsURL).pipe(
      tap((carts) => this.cartsSubject.next(carts))
    );
  }

  // Add item and instantly append it to the live stream
  addCart(cart: Cart): Observable<Cart> {
    return this._http.post<Cart>(this.cartsURL, cart, this.httpOptions).pipe(
      tap((newCart: Cart) => {
        const currentCarts = this.cartsSubject.value;
        this.cartsSubject.next([...currentCarts, newCart]);
      }),
      catchError(this.handleError<Cart>('addCart'))
    );
  }

  // Delete item and filter it out of the live stream
  deleteCart(_id: number): Observable<any> {
    const url = `${this.cartsURL}/${_id}`;
    return this._http.delete(url, this.httpOptions).pipe(
      tap(() => {
        const currentCarts = this.cartsSubject.value;
        this.cartsSubject.next(currentCarts.filter(cart => cart._id !== _id));
      })
    );
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
      console.error(error);
      return of(result as T);
    };
  }
}