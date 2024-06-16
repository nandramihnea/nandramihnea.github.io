import { Link } from "react-router-dom";

export default function Root() {
  return (
    <main className="min-h-screen bg-[url('src/images/pokemon.webp')] bg-no-repeat bg-cover brightness-75 content-center">
      <Link to="/list" className="bg-blue-400">
        <p className="p-10 text-2xl text-center text-green-900 bg-red-400 md:text-5xl">
          Enter the Pokedex
        </p>
      </Link>
    </main>
  );
}
