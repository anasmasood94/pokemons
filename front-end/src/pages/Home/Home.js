import Pokemons from "../../components/Pokemons/Pokemons";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="container d-flex flex-wrap p-5">
        <Pokemons />
      </div>
    </>
  );
};

export default Home;
