import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
const Menu = () => {
    return ( 
        <Fragment>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link to="/nuevo-platillo" className=" bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white font-bold transition-all ease-in-out rounded duration-500">
                Agregar Platillo
            </Link>
        </Fragment>
        );
}
 
export default Menu;