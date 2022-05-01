import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const Checkout = () => {
  const { cartItems, addItemToCart, removeItemFromCart } =
    useContext(CartContext);

  return (
    <div>
      <h1>I am the Checkout page</h1>
      <div>
        {cartItems.map((cartItem) => {
          const { id, name, quantity } = cartItem;
          return (
            <div key={id}>
              <h2>{name}</h2>
              <span>{quantity}</span>
              <br />
              <span onClick={() => removeItemFromCart(cartItem)}>
                Decrement
              </span>
              <br />
              <span onClick={() => addItemToCart(cartItem)}>Increment</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Checkout;
