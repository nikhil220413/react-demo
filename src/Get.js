import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Front from './Front';



function Get() {
  const [userData, setdata] = useState([]);
  const [showForm, setshowform] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  


  useEffect(() => {
    axios
      .get('http://localhost:8080/goglobal/v1/estimate/estimates')
      .then((response) => {
        //console.log(response);
        setdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showForm]);

  const handleDelete = (id) => {
    console.log('Deleting item with ID:', id);
   
    axios.delete(`http://localhost:8080/goglobal/v1/estimate/estimate/${id}`)
      .then((response) => {
        console.log('Item deleted successfully');
        setdata((prevData) => prevData.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.log('Error deleting item:', error);
      });
  };


  const handleFront = () => {
    setshowform(true);
  }
  const handleUpdate = (item) => {
    console.log("===item", item)
    setSelectedRow(item);
    
    setshowform(true);
    


  }
  const handleFormSubmit = () => {
    setshowform(false);
    
  };
  const handleView = () => {
    setshowform(false);
  };


  return (
    <div>
      <h2 className="text-center">Estimate List</h2>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={handleFront}>
                Add
              </button>
              <button className="btn btn-primary" onClick={handleView} style={{ marginLeft: '10px' }}>
                View
              </button>
            </div>
          </div>
        </div>
      </div>


      <br />
      {showForm ? (
        <Front onSubmit={handleFormSubmit} row={selectedRow}  />
      ) : (
        <table className="table text-center">
          <thead>
            <tr>
              <th>Source Language</th>
              <th>Target Language</th>
              <th>Currency</th>
              <th>Total Words</th>
              <th>Actions</th>

            </tr>
          </thead>
          <tbody>
            {userData.map((item) => (
              <tr key={item.id}>
                <td>{item.sourceLanguage}</td>
                <td>{item.targetLanguage}</td>
                <td>{item.currency}</td>
                <td>{item.numberOfWords}</td>
                <td>
                  <button className="btn btn-info" onClick={() => handleUpdate(item)}>Update</button>
                  <button
                    style={{ marginLeft: '20px' }}
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );


}

export default Get;
