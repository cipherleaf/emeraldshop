import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { CartService } from '../cart.service'; // Import CartService here
import { Cart } from '../cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  name: string = '';
  stocks: number = 0;
  price: number = 0;
  imglinks: string = '';

  // Inject CartService instead of CartsComponent
  constructor(
    private productService: ProductService, 
    private cartService: CartService
  ) { }

  callToCarts(name: string, quantity: number, price: number, imglinks: string): void {
    const newCartItem = {
      name,
      quantity,
      price,
      imglinks
    } as Cart;

    this.cartService.addCart(newCartItem).subscribe(() => {
      console.log('Added to cart and broadcasted successfully!');
    });
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => (this.products = products));
  }

  addProduct(){
    const newProduct = {
      name: this.name,
      stocks: this.stocks,
      price: this.price
    }
    this.productService.addProduct(newProduct)
      .subscribe(product=>{
        this.products.push(product);
      });
  }

  deleteProduct(product: Product): void {
    this.products = this.products.filter((h) => h !== product);
    this.productService.deleteProduct(product._id).subscribe();
  }
}