import React, { useState } from 'react'


const useCart = () => {
  const [products, setProducts] = useState([]);
  
  const total = Array.isArray(products)
    ? products.reduce((acum, product) =>
        acum + (product.quantity * product.price), 0)
    : 0;

  const countProducts = Array.isArray(products)
    ? products.reduce((acum, product) =>
        acum + parseFloat(product.quantity), 0)
    : 0;  

  const clearCart = () =>
    setProducts([]);
    const addProduct = (newProduct) => {
      const availableStock = newProduct.stock - newProduct.quantity; // Calcular stock disponible
      console.log(availableStock);
      if (products.some(item => item.id === newProduct.id)) {
        console.log('if verdadero');
        const updatedProducts = products.map(item =>
          item.id === newProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        setProducts(updatedProducts);
  
      } else {
        if (availableStock >= 0) {
          console.log('else');
        setProducts([ ...products, newProduct ]);  
      }
      else {
        // No hay suficiente stock, puedes manejar esto de alguna manera (por ejemplo, mostrar un mensaje de error)
        console.log('No hay suficiente stock disponible.');
      }
      

    }
    }
 const changeQuantity = (product, newQuantity) => {
    const updatedProducts = products.map(item => {
      if (item.id === product.id) {
        const availableStock = item.stock - newQuantity;
        console.log(availableStock);
        console.log("new cantidad",{newQuantity});
        
        if (availableStock >= 0) {
          return { ...item, quantity: newQuantity };
        } else {
          console.log('No hay suficiente stock disponible.');
          return item; // Mantener la cantidad actual si no hay suficiente stock
        }
      } else {
        return item;
      }
    });

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
  };

  return {
    products,
    total,
    countProducts,

    clearCart,
    changeQuantity,
    addProduct,
    deleteProduct,
    checkoutCart
  };
}

export default useCart;
