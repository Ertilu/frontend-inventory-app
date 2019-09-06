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
  Button
} from "reactstrap";
import Modal from 'react-bootstrap/Modal';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalBody from 'react-bootstrap/ModalBody';

class productItem extends Component {
    constructor(props) {
      super(props);

      this.onDelete = this.onDelete.bind(this);
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
    render() {
        const { id, name, description, quantity, onDelete, image, category, dateAdded, dateUpdated } = this.props;
        // const [show, setShow] = useState(false);

        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);
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
            <Link to={"editProduct/" + id}>
              <button className="btn btn-primary" onClick={this.Example}>Edit data</button>
            </Link>
            <hr />
        </div>
        
      ); 
    }
  }

export default productItem;