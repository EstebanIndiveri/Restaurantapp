import React from 'react';
import {Routes,Route} from 'react-router';
import SideBar from './components/ui/SideBar';
import NotFound404 from './components/views/404';
import Menu from './components/views/Menu';
import NuevoPlatillo from './components/views/NuevoPlatillo';
import Ordenes from './components/views/Ordenes';

function App() {
  return (
    <div className="md:flex min-h-screen">
      <SideBar/>
      <div className="md:w-3/5 xl:w-4/5 p-6">
      <Routes>
        <Route path="/" element={<Ordenes/>} />
        <Route path="/nuevo-platillo" element={<NuevoPlatillo/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/notfound" element={<NotFound404/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;
