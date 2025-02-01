import { Header, Home } from "./components";

const App = () => {
  return (
    <div className="w-screen bg-primary font-cairo md:h-screen">
      <div className="container flex h-full flex-col">
        <Header />
        <Home />
      </div>
    </div>
  );
};

export default App;
