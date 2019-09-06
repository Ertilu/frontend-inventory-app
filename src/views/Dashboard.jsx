/*!

=========================================================
* Paper Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useState, useEffect} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart
} from "variables/charts.jsx";
import ProductItem from "./productItem";
import axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      isLoading: true,
      errors: null,
      total: 0,
      page: '' || 1
    };
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
    localStorage.setItem('setPage', this.state.page);
    localStorage.getItem('setPage');
  }

  componentDidMount() {
    let data = [
      localStorage.getItem('search'), 
      localStorage.getItem('by'),
      localStorage.getItem('type'),
      localStorage.getItem('page')
    ];  
    console.log(data[3]);
    const products = this.getProducts(data);
      this.setState({
        products, 
     });
     localStorage.removeItem('search');
     localStorage.removeItem('by');
     localStorage.removeItem('type');
  }

  getProducts(data) {
    const whatSearch = '?name='+data[0];
    const searchValue = data[0] !== null ? whatSearch : '?name=';

    const type = data[2] === null ? 'ASC' : 'DESC';
    
    const orderBy = data[0] !== null ? '&by='+data[1]+'&type='+type : '&by=pId&type=ASC';

    const page = '&page='+data[3];

    const queryView = 'http://localhost:8000/products' + searchValue + orderBy + page;
    axios
    // .get("https://randomproduct.me/api/?results=5")
    .get(queryView)
    .then(response =>
      response.data.values.map(product => ({
        id: `${product.pId}`,
        name: `${product.pName}`,
        description: `${product.pDesc}`,
        quantity: `${product.pQty}`,
        image: `${product.pImage}`,
        category: `${product.category}`,
        dateAdded: `${product.pDateAdded}`,
        dateUpdated: `${product.pDateUpdated}`
      }))
    )
    .then(products => {
      this.setState({
        products,
        isLoading: false
      })
    })
 
    .catch(error => this.setState({ error, isLoading: false }));
  }
  
  render() {
    const { isLoading, products } = this.state;

    return (
      <>
        <div className="content">
          <Row>
            <Col lg="12" md="12" sm="12">
              <div className="Product justify-content-end text-center">
              <h1>List Products</h1>
              {!isLoading ? (
                products.map(product => {         
                  return (
                  <ProductItem
                    key={product.name}
                    {...product}
                  />
                  );
                })
              ) : (
                <h1>Loading...</h1>
              )}
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
