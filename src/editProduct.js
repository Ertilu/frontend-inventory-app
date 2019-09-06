import React, {Component} from 'react';
import axios from 'axios';

 class EditProduct extends Component {
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
  
  componentDidMount = async () => {
    const id = this.props.match.params.id

    const res = await axios 
                  .get("http://localhost:8000/products/" + id)

    this.setState({
      pName: res.data.values[0].pName,
      pDesc: res.data.values[0].pDesc,
      pImage: res.data.values[0].pImage,
      idCategory: res.data.values[0].idCategory,
      pQty: res.data.values[0].pQty,
      pDateAdded: new Date(),
      pDateUpdated: new Date(),
    })
      
  }

  handlerChange = (e) => {
    this.setState({ [e.target.name] : e.target.value })
  }

  handlerSubmit = (event) => {
    const id = this.props.match.params.id
    event.preventDefault();
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

     return(
    <div>
        <h1>Edit Product</h1>
        <form onSubmit={this.handlerSubmit}>
          <ul>
            <li><label htmlFor="name">Product Name : </label></li>
            <li><input type="text" name="pName" id="name" value={pName} onChange={this.handlerChange} /></li>
          </ul>
          <ul>
            <li><label htmlFor="description">Description : </label></li>
            <li><input type="text" name="pDesc" id="description" value={pDesc} onChange={this.handlerChange} /></li>
          </ul>
          <ul>
            <li><label htmlFor="image">Image : </label></li>
            <li><input type="text" name="pImage" id="image" value={pImage} onChange={this.handlerChange} /></li>
          </ul>
          <ul>
            <li><label htmlFor="idCategory">ID Category : </label></li>
            <li><input type="text" name="idCategory" id="idCategory" value={idCategory} onChange={this.handlerChange} /></li>
          </ul>
          <ul>
            <li><label htmlFor="quantity">Quantity : </label></li>
            <li><input type="text" name="pQty" id="quantity" value={pQty} onChange={this.handlerChange} /></li>
          </ul>
          <ul>
            <input type="submit" value="Edit data"/>
          </ul>
        </form>
    </div>  
     )  
   }
  }


export default EditProduct;
