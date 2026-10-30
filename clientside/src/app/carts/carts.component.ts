import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent implements OnInit {
  carts: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Listen to live updates from the service stream
    this.cartService.carts$.subscribe((carts) => {
      this.carts = carts;
    });
    
    // Initial fetch from backend
    this.cartService.getCarts().subscribe();
  }

  deleteCart(cart: Cart): void {
    this.cartService.deleteCart(cart._id).subscribe();
  }
}
