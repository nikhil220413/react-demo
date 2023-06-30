import React, { useState } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

function Front(props) {
    const { row } = props;
    console.log("===row", row)
    //const [selectedRow, setSelectedRow] = useState({});

    const [source, setSource] = useState(row?.sourceLanguage || '')
    const [target, setTarget] = useState(row?.targetLanguage || '')
    const [count, setCount] = useState(row?.numberOfWords || '')
    const [money, setMoney] = useState(row?.currency || '')
    const handleSubmit = (e) => {
        //setSelectedRow(e);
        e.preventDefault();
        const sourceLanguage = source;
        const targetLanguage = target;
        const numberOfWords = count;
        const currency = money;


        if (row.id) {
            axios.put(`http://localhost:8080/goglobal/v1/estimate/estimate/${row.id}`, { sourceLanguage, targetLanguage, numberOfWords, currency })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                })
            props.onSubmit();

        } else {
            
            axios.post("http://localhost:8080/goglobal/v1/estimate/estimate", { sourceLanguage, targetLanguage, numberOfWords, currency })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                })
            props.onSubmit();
        }

    }
    return (
        <div className="App container ">
            <form className="mt-4">
                <div className="form-group mt-2">
                    <label htmlFor="number"> Source Language</label>
                    <select id="sourceLanguage" onChange={(newValue) => setSource(newValue.target.value)}
                        value={source} className="form-select" aria-label="Default select example">
                        <option value>Select Source language</option>
                        <option value="German">German</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Arabic">Arabic</option>
                        <option value="Japanese">Japanese</option>
                    </select>
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="number"> Target Language</label>
                    <select id="targetlanguage" onChange={(newValue) => setTarget(newValue.target.value)}
                        value={target} className="form-select" aria-label="Default select example">
                        <option value>Select Target language</option>
                        <option value="Japanese">Japanese</option>
                        <option value="German">German</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor="number"> Total words for Translation</label>

                    <input
                        type="number" min="0"
                        onChange={(newValue) => setCount(newValue.target.value)}
                        value={count}
                        className="form-control"
                        id="count"
                        rows={3}
                    />
                </div>
                <div className="form-group mt-3">
                    <label htmlFor="number"> Preferred Currency</label>
                    <select onChange={(newValue) => setMoney(newValue.target.value)}
                        value={money} id="currency" className="form-select" aria-label="Default select example">
                        <option value>Select currency</option>
                        <option value="USD">USD</option>
                        <option value="AUD">AUD</option>
                        <option value="BRL">BRL</option>
                        <option value="EUR">EUR</option>
                        <option value="Rupee">Rupee</option>


                    </select>
                </div>

                <button onClick={handleSubmit} type="submit" className="mt-4 btn btn-primary">
                    Submit
                </button>

            </form>
        </div>
    );
}


export default Front;
