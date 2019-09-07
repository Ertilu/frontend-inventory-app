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
                    <FormGroup>
                      <Label for="name">Product name</Label>
                      <Input type="text" name="pName" id="name" autoComplete="off" placeholder="Enter product name" onChange={this.handlerChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="desc">Description</Label>
                      <Input type="text" name="pDesc" id="desc" autoComplete="off" placeholder="Enter description" onChange={this.handlerChange} />
                    </FormGroup>
                    <FormGroup>
                      <Label for="image">Image</Label>
                      <Input type="text" name="pImage" id="image" autoComplete="off" placeholder="Product Image (URL)"onChange={this.handlerChange} />
                    </FormGroup>
                    <FormGroup>
                    <Label for="idCategory">Select Category</Label>
                      <Input type="select" name="idCategory" id="idCategory" onChange={this.handlerChange}>
                        <option value="1">Daily needs</option>
                        <option value="2">Electronic</option>
                        <option value="3">Food & drink</option>
                        <option value="4">Automotive</option>
                      </Input>
                    </FormGroup>
                      <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input type="number" name="pQty" id="quantity" autoComplete="off" placeholder="Quantity" onChange={this.handlerChange} />
                  </FormGroup>
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
