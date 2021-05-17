import './App.css';
import Navbar from './Components/Navbar/Nabvar';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import ReservaMesa from './Components/ReservaMesa/ReservaMesa';
import ListaReservas from './Components/ListaReservas/ListaReservas';

function App() {
  return (
    <div className="App container-sm">
        <Router>
            <Navbar />
            <Route exact path="/">
              <div>
              <h1>Reserva de mesa</h1>
              <div>
              <ReservaMesa />
              </div>
            </div>
            </Route>
           <Route exact path="/lista-reservas">
              <h1>Lista de reservas</h1>
              <ListaReservas />
           </Route>
        </Router>
    </div>
  );
}

export default App;
