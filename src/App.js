import "./App.css";
import Form from "./Form";
import Table from "./Table";
import React, { useEffect, useState } from "react";

function App() {
  const product = {
    id: 0,
    name: "",
    brand: "",
  };

  const [btnRegister, setBtnRegister] = useState(true);

  const [products, setProducts] = useState([]);

  const [objProduct, setObjPoduct] = useState(product);

  useEffect(() => {
    fetch("http://localhost:8080/products/")
      .then((retorno) => retorno.json())
      .then((retorno_convertido) => setProducts(retorno_convertido));
  }, []);

  const inputProducts = (e) => {
    setObjPoduct({
      ...objProduct,
      [e.target.name]: e.target.value,
    });
  };

  const register = () => {
    fetch("http://localhost:8080/products/", {
      method: "post",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        if (retorno_convert.mensagem !== undefined) {
          alert(retorno_convert.mensagem);
        } else {
          setProducts([...products, retorno_convert]);
          alert("Produto cadastrado com sucesso!");
          clearForm();
        }
      });
  };

  const clearForm = () => {
    setObjPoduct(product);
    setBtnRegister(true);
  };

  const selectProduct = (index) => {
    setObjPoduct(products[index]);
    setBtnRegister(false);
  };

  const removeProduct = () => {
    fetch("http://localhost:8080/products/" + objProduct.id, {
      method: "delete",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        alert(retorno_convert.mensagem);

        let vetorTemp = [...products];

        let index = vetorTemp.findIndex((p) => {
          return p.id === objProduct.id;
        });

        vetorTemp.splice(index, 1);

        setProducts(vetorTemp);

        clearForm();
      });
  };

  const updateProduct = () => {
    fetch("http://localhost:8080/products/", {
      method: "put",
      body: JSON.stringify(objProduct),
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((retorno) => retorno.json())
      .then((retorno_convert) => {
        if (retorno_convert.mensagem !== undefined) {
          alert(retorno_convert.mensagem);
        } else {
          alert("Produto alterado com sucesso!");

          let vetorTemp = [...products];

          let index = vetorTemp.findIndex((p) => {
            return p.id === objProduct.id;
          });

          vetorTemp[index] = objProduct;

          setProducts(vetorTemp);

          clearForm();
        }
      });
  };

  return (
    <div>
      <Form
        button={btnRegister}
        eventInput={inputProducts}
        register={register}
        obj={objProduct}
        clear={clearForm}
        remove={removeProduct}
        update={updateProduct}
      />
      <Table vetor={products} select={selectProduct} />
    </div>
  );
}

export default App;
