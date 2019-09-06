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
  Col
} from "reactstrap";

class EditProduct extends React.Component {
  state={
    pIDd: '',
    pName: '',
    pDesc: '',
    pImage: '',
    idCategory: '',
    pQty: '',
    pDateAdded: '',
    pDateUpdated: '',
  }
 
  UNSAFE_componentDidMount = () => {
    const id = this.props.match.params.id

    const res = axios 
                  .get("http://localhost:8000/products/" + id)

    this.setState({
      pName: res.data.data[0].pName,
      pDesc: res.data.data[0].pDesc,
      pImage: res.data.data[0].pImage,
      idCategory: res.data.data[0].idCategory,
      pQty: res.data.data[0].pQty,
      pDateAdded: new Date(),
      pDateUpdated: new Date(),
    })
    console.log(this.state);
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handlerSubmit = (event) => {
    const id = this.props.match.params.id
    event.preventDefatrt();
    axios
    .put('http://localhost:8000/products/' + id, this.state)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.props.history.push('/Product');
  }

  render() {
    const {pName, pDesc, pImage, idCategory, pQty} = this.state;
    return (
      <>
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Edit Product</CardTitle>
                </CardHeader>
                <CardBody>
                    <form onSubmit={this.handlerSubmit}>
                    <tr>
                      <td><label htmlFor="name">Product Name : </label></td>
                      <td><input type="text" name="pName" id="name" value={pName} onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="description">Description : </label></td>
                      <td><input type="text" name="pDesc" id="description" value={pDesc} onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="image">Image : </label></td>
                      <td><input type="text" name="pImage" id="image" value={pImage} onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="idCategory">ID Category : </label></td>
                      <td><input type="text" name="idCategory" id="idCategory" value={idCategory} onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                      <td><label htmlFor="quantity">Quantity : </label></td>
                      <td><input type="text" name="pQty" id="quantity" value={pQty} onChange={this.handlerChange} /></td>
                    </tr>
                    <tr>
                      <input type="submit" value="Edit data" className="btn btn-success" />
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

  export default EditProduct;
  