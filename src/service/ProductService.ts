export default class ProductService {
  getProductsSmall(): Promise<any> {
    return fetch("data/products-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProducts(): Promise<any> {
    return fetch("data/products.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getProductsWithOrdersSmall(): Promise<any> {
    return fetch("data/products-orders-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
