import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

const App = () => {
  return (
    <Routes>
      {/* Everything inside of this Component can be "routable" */}
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* we need to say: "when you start matching this path, I know there will be 
            a subsequent the URL parameter set after shop. Whatever that set is, I don't care.
            => That's what this star/wild card represents meaning "anything" ("shop/*") */}
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
