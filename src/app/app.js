import header from ".ui/header/header";

function App() {
  return (
    <div>
      <header />
      <div className="d-flex">
        <div>sidebar</div>
        <div>
          <page />
        </div>
      </div>
    </div>
  );
}

export default App;
