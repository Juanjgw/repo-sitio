import React, { useState } from 'react'


const useCart = () => {
  const [products, setProducts] = useState([]);
  
  const total = Array.isArray(products)
    ? products.reduce((acum, product) =>
        acum + (product.quantity * product.price), 0)
    : 0;

  const countProducts = Array.isArray(products)
      ? products.reduce((acum, product) =>
          acum + product.quantity, 0)
      : 0;

  const clearCart = () =>
    setProducts([])

  const addProduct = (newProduct) => {
    if (products.some(item => item.id === newProduct.id)) {
      
      const updatedProducts = products.map(item =>
				item.id === newProduct.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
      setProducts(updatedProducts);

    } else {
      setProducts([ ...products, newProduct ]);  
    }
  }

  const changeQuantity = (product, newQuantity) => {

    const updatedProducts = products.map(item =>
      item.id === product.id
        ? { ...item, quantity: newQuantity }
        : item
    );

    setProducts(updatedProducts);
  };

  const deleteProduct = (product) => {
    const results = products.filter((item) => item.id !== product.id);
   
    setProducts(results);
  };

  const checkoutCart = () => {
    const stringProducts = products.map((producto) => producto.nameProduct).join(', ');
    const mensaje = `¡Hola! Quiero hacer un pedido con los siguientes productos: ${stringProducts}. Total: $${total}`;
    const numeroTelefono = '5491158536622';
  
    const enlaceWhatsApp = `https://wa.me/${numeroTelefono}/?text=${encodeURIComponent(mensaje)}`;
    window.location.href = enlaceWhatsApp;
  }

  return {
    products,
    total,
    countProducts,

    clearCart,
    changeQuantity,
    addProduct,
    deleteProduct,
    checkoutCart
  }
}

export default useCart