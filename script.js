const { useState } = React;

const products = [
  { id: 1, name: 'Product-1', price: 100 },
  { id: 2, name: 'Product-2', price: 200 },
  { id: 3, name: 'Product-3', price: 300 },
];

function ProductList({ onAdd, onRemove, cart }) {
  return (
    <div className="box">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <span>{product.name} - ${product.price}</span>
            <div>
              <button onClick={() => onRemove(product.id)}>-</button>
              <span>{cart[product.id] || 0}</span>
              <button onClick={() => onAdd(product.id)}>+</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Cart({ cart }) {
  const cartItems = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const product = products.find(p => p.id === parseInt(id));
      return { ...product, quantity };
    });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="box">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>No Product added to the cart</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="total-price">Total: ${totalPrice}</div>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState({});

  const handleAdd = (productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const handleRemove = (productId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  return (
    <div className="container">
      <ProductList onAdd={handleAdd} onRemove={handleRemove} cart={cart} />
      <Cart cart={cart} />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
