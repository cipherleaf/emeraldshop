import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Product } from '../product';

import { CartsComponent } from '../carts/carts.component';

@Component({
  providers: [CartsComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Product[];
  product!: Product;
  name!: string;
  stocks!: number;
  price!: number;
  imglinks!: string;

  constructor(private productService: ProductService, private comp: CartsComponent) { }

  callToCarts(name: string, stocks: number, price: number, imglinks: string): void {
    this.comp.callFromProducts(name, stocks, price, imglinks);
  }

  // callMe():void{
    
  // }

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

    this.getProducts();
  }

  deleteProduct(product: Product): void {
    this.products = this.products.filter((h) => h !== product);
    this.productService.deleteProduct(product._id).subscribe();
  }


}
