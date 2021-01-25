import React from 'react';
import {Routes,Route} from 'react-router';
import NotFound404 from './components/views/404';
import Menu from './components/views/Menu';
import NuevoPlatillo from './components/views/NuevoPlatillo';
import Ordenes from './components/views/Ordenes';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Ordenes/>} />
        <Route path="/nuevo-platillo" element={<NuevoPlatillo/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/notfound" element={<NotFound404/>}/>
      </Routes>
    </div>
  );
}

export default App;
