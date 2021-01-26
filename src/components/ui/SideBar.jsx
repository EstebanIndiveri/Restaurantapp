import React from 'react';
import { NavLink } from 'react-router-dom';


const SideBar = () => {
    return ( 
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">RestaurantApp</p>
                <p className="mt-4 text-gray-500">Administra tu Restaurant en las siguientes opciones</p>
                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 transition duration-500 ease-in-out rounded mb-2" activeClassName="text-yellow-500" exact="true" to="/">Home</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900 transition duration-500 ease-in-out rounded" activeClassName="text-yellow-500" exact="true" to="/menu">Menú</NavLink>

                </nav>
            </div>
        </div>
        );
}
 
export default SideBar;