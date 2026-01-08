import BoardPage from "./pages/BoardPage";
import Header from "./components/Header/Header";

function App() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <BoardPage />
    </div>
  );
}

export default App;
