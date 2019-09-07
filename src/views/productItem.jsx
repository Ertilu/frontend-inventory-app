import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button, 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  FormGroup,
  Label,
  Input
} from "reactstrap";
// import Modal from 'react-bootstrap/Modal';
// import ModalTitle from 'react-bootstrap/ModalTitle';
// import ModalDialog from 'react-bootstrap/ModalDialog';
// import ModalBody from 'react-bootstrap/ModalBody';

class productItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        pId: this.props.id,
        pName: this.props.name,
        pDesc: this.props.description,
        pImage: this.props.image,
        idCategory: this.props.idCategory,
        pQty: this.props.quantity,
        pDateAdded: new Date(),
        pDateUpdated: new Date(),
        products: []
      };
      this.onDelete = this.onDelete.bind(this);
      this.toggle = this.toggle.bind(this);
    }

    onDelete =  () => {
      let token = localStorage.getItem('token'); 
     axios 
      .delete("http://localhost:8000/products/" + this.props.id, {
        headers: {token: `${token}`}
      })
      console.log(this.props.id)
      alert('data deleted');
    }

    deleteConfirm = () =>  {
      confirmAlert({
        title: 'Confirmation',
        message: `Are you sure want to delete this product ${this.props.name} ?`,
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.onDelete()
          },
          {
            label: 'No',
            onClick: () => {} 
          }
        ]
      })
    }

    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
      if (!this.state.modal) {
        const res = axios 
          .get("http://localhost:8000/products/"+this.props.id)
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
      } else {
        console.log('ga ada modal')
      }
    }

    handlerChange = (e) => {
      this.setState({ [e.target.name] : e.target.value })
    }

    handlerSubmit = (event) => {
      const id = this.props.id
      let token = localStorage.getItem('token'); 
      event.preventDefault();
      axios
      .put('http://localhost:8000/products/' + id, this.state, {
        headers: {token: `${token}`}
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      alert('data updated');
    }
  
    render() {
        const { id, name, description, quantity, onDelete, image, category, dateAdded, dateUpdated } = this.props;
        const { pId, pName, pDesc, pQty, pImage, idCategory, pDateAdded, pDateUpdated } = this.state;
        
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
       return ( 
        <div key={id}>
            <p>Product name : {name}</p>
            <p>Description : {description}</p>
            <div>
            <img src={image} alt={name} style={{widt: 'green', fontWeight: 'bold'}} />
            </div>
            <p>Category : {category}</p>
            <p>Quantity : {quantity}</p>
            <p>Date Added : {dateAdded}</p>
            <p>Date Updated : {dateUpdated}</p>
            <button onClick={this.deleteConfirm} className="btn btn-danger">delete data</button>
            {/* <Link to={"editProduct/" + id }> */}
            <Button color="success" className="btn btn-success" onClick={this.toggle} >Edit data</Button>
            {/* </Link> */}
            {/* <Route path="editProduct/"  component={EditProduct}/> */}
            <hr />


            {/* Modal Box */}
            <div>        
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle} close={closeBtn}>Edit Product</ModalHeader>
                <ModalBody>
                <form onSubmit={this.handlerSubmit}>
                  <FormGroup>
                    <Label for="name">Product name</Label>
                    <Input type="text" name="pName" id="name" autoComplete="off" placeholder="Enter product name" value={pName} onChange={this.handlerChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="desc">Description</Label>
                    <Input type="text" name="pDesc" id="desc" autoComplete="off" placeholder="Enter description" value={pDesc} onChange={this.handlerChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="image">Image</Label>
                    <Input type="text" name="pImage" id="image" autoComplete="off" placeholder="Product Image (URL)" value={pImage} onChange={this.handlerChange} />
                  </FormGroup>
                  <FormGroup>
                    <Label for="idCategory">Select Category</Label>
                    <Input type="select" name="idCategory" id="idCategory" value={idCategory} >
                      <option value="1">Daily needs</option>
                      <option value="2">Electronic</option>
                      <option value="3">Food & drink</option>
                      <option value="4">Automotive</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="quantity">Quantity</Label>
                    <Input type="number" name="pQty" id="quantity" autoComplete="off" placeholder="Quantity" value={pQty} onChange={this.handlerChange} />
                  </FormGroup>
                <ModalFooter>
                  <Button type="submit" color="primary" onClick={this.toggle}>Edit data</Button>{' '}
                  <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
              </form>
              </ModalBody>
            </Modal>  
          </div>
        </div>
      ); 
    }
  }

export default productItem;