import { Tasks, Timer } from "./";

const Home = () => {
  return (
    <main className="my-3 grid grow grid-cols-5 grid-rows-2 gap-2">
      <div className="col-span-2">
        <Timer />
      </div>
      <div className="col-span-3 col-start-3 row-span-2 row-start-1">
        <Tasks />
      </div>
      {/* demo */}
      <div className="col-span-2 bg-red-300">3</div>
    </main>
  );
};

export default Home;
