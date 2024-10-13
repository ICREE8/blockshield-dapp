import HomePage from "./pages/index";

export default function Home() {
  return (
    <div className="container">
      <header className="header-box">
        <div className="button-container">
          <button className="rent-rv-button">Rent RV</button>
          <button className="view-airport-button">View Airport</button>
        </div>
      </header>
      <HomePage />
    </div>
  );
}