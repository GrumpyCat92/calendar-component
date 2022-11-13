import "./App.css";
import Calendar from "./Calendar";

function App() {
  const now = new Date(2022, 5, 13);
  return <Calendar date={now} />;
}

export default App;
