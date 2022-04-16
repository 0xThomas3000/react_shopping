import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";

const App = () => {
  return (
    <Routes>
      {" "}
      {/* Everything inside of this Component can be "routable" */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default App;
