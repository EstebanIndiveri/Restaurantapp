import React, { Fragment,useState,useEffect,useContext } from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext} from '../../firebase'
import Platillo from '../ui/Platillo';

const Menu = () => {
    const{firebase}=useContext(FirebaseContext);

    const [platillos, setPlatillos] = useState([]);

    useEffect(()=>{
        const obtenerPlatillos=()=>{
            firebase.db.collection('productos').onSnapshot(handleSnapshot);

            
        };
        obtenerPlatillos();
    },[])

    // snapshot db en timpo real
    const handleSnapshot =(snapshot)=>{
        const platillos=snapshot.docs.map(doc=>{
            return{
                id:doc.id,
                ...doc.data()
            }
        });
        setPlatillos(platillos);
    }

    return ( 
        <Fragment>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link to="/nuevo-platillo" className=" bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white font-bold transition-all ease-in-out rounded duration-500">
                Agregar Platillo
            </Link>
            {platillos.map(platillo=>(
                <Platillo
                    key={platillo.id}
                    platillo={platillo}
                />
            ))}
        </Fragment>
        );
}
 
export default Menu;