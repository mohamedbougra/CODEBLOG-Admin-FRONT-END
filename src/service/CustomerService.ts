export default class CustomerService {
  getCustomersSmall(): Promise<any> {
    return fetch("data/customers-small.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersMedium(): Promise<any> {
    return fetch("data/customers-medium.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersLarge(): Promise<any> {
    return fetch("data/customers-large.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomersXLarge(): Promise<any> {
    return fetch("data/customers-xlarge.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }

  getCustomers(params: any): Promise<any> {
    const queryParams = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");
    return fetch(
      "https://www.primefaces.org/data/customers?" + queryParams
    ).then((res) => res.json());
  }
}
