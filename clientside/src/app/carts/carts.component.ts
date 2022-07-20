import { Component, OnInit } from '@angular/core';

import { CartService } from '../cart.service';
import { Cart } from '../cart';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css'],
  providers: [CartService]
})

export class CartsComponent implements OnInit {
  carts!: Cart[];
  cart!: Cart;
  _id!: number;
  name!: string;
  quantity!: number;
  price!: number;
  imglinks!: string;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(): void {
    this.cartService.getCarts().subscribe((carts) => (this.carts = carts));
  }

  callFromProducts(names: string, stocks: number, prices: number, imglink: string): void{
    this.addCart(names,stocks,prices,imglink);
  }

  // addCart(names: string, stocks: number, prices: number, imglink: string){
  //   const newCart = {
  //     _id: this._id,
  //     name: names,
  //     quantity: stocks,
  //     price: prices,
  //     imglinks: imglink
  //   }

  //   this.cartService.addCart(newCart)
  //     .subscribe(cart=>{this.carts.push(cart);
  //     });

  //   this.getCarts();
  // }

  addCart(names: string, stocks: number, prices: number, imglink: string){

    this.cartService.addCart({ 
      _id:this._id,
      name:names,
      quantity:stocks,
      price:prices,
      imglinks:imglink
      } as Cart).subscribe((cart) => {
      this.carts.push(cart);
    });

    this.getCarts();
  }

  deleteCart(cart: Cart): void {
    this.carts = this.carts.filter((h) => h !== cart);
    this.cartService.deleteCart(cart._id).subscribe();
  }
}
