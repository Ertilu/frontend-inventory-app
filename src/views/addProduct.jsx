import React from 'react';  
import axios from 'axios';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

class AddProduct extends React.Component {
  state={
    'pName': '',
    'pDesc': '',
    'pImage': '',
    'idCategory': '',
    'pQty': '',
    'pDateAdded': new Date(),
    'pDateUpdated': new Date()
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    let token = localStorage.getItem('token'); 
    axios
    .post('http://localhost:8000/products', this.state, {
      headers: {token: `${token}`}
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    alert('new data added');
    this.props.history.push('/Product');
  }

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Add Product</CardTitle>
                </CardHeader>
                <CardBody>
                    <form onSubmit={this.handlerSubmit}>
                    <tr>
                        <td><label htmlFor="name">Product Name : </label></td>
                        <td><input type="text" name="pName" id="name"  onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="description">Description : </label></td>
                        <td><input type="text" name="pDesc" id="description" onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="image">Image : </label></td>
                        <td><input type="text" name="pImage" id="image" onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="idCategory">ID Category : </label></td>
                        <td>
                        <input type="text" name="idCategory" id="idCategory" onChange={this.handlerChange} /> 
                        </td>
                   
                    </tr>
                    <tr>
                        <td><label htmlFor="quantity">Quantity : </label></td>
                        <td><input type="text" name="pQty" id="quantity" onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                        <input type="submit" value="Add data" className="btn btn-success" />
                    </tr>
                    </form>
                 
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default AddProduct;
