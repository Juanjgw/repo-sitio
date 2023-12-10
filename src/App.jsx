import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import useCart from './hooks/useCart';

function App() {
	const { 
		products, 
		total, 
		countProducts, 
		clearCart,
		changeQuantity,
		addProduct,
		deleteProduct,
		checkoutCart } = useCart();

	return (
		<>
			<Header
				products={products}
				total={total}
				countProducts={countProducts}
				clearCart={clearCart}
				changeQuantity={changeQuantity}
				deleteProduct={deleteProduct}
				checkoutCart={checkoutCart}
			/>
			<ProductList
				addProduct={addProduct}
			/>
		</>
	);
}

export default App;
