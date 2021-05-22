import {Component, OnInit} from '@angular/core';
import {ProductCategory} from '../../common/product-category';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  // @ts-ignore
  productCategories: ProductCategory[];

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.getProductCategories();
  }

  private getProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        console.log(JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }
}
