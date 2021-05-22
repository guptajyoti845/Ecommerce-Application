import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {ProductCategory} from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081';
  private categoryUrl = 'http://localhost:8081/api/product-category';

  constructor(public httpClient: HttpClient) {
  }

  getProducts(categoryId: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${categoryId}`;
    return this.httpClient.get<IGetProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductsPaginated(thePage: number, thePageSize: number, categoryId: number): Observable<IGetProducts> {
    const searchUrl = `${this.baseUrl}/api/products/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<IGetProducts>(searchUrl);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<IGetProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number): Observable<Product> {
    // need to build url
    const productUrl = `${this.baseUrl}/api/products/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }
  searchProducts(theKeyword: string): Observable<Product[]> {

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(searchUrl);
  }

}


interface IGetProducts {
  _embedded: {
    products: Product[]
  };
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  };
}

interface IGetProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  };

}
