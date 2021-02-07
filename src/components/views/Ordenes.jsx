import React,{Fragment,useEffect,useState,useContext} from 'react';
import {FirebaseContext} from '../../firebase';
import Orden from '../ui/Orden';

const Ordenes = () => {
    const {firebase}=useContext(FirebaseContext);
    const [ordenes,setOrdenes]=useState([]);
    useEffect(() => {
        const getOrdenes=()=>{
            firebase.db.collection('pedidos').where('completado','==',false).onSnapshot(manejarSnapshot);
        }
        getOrdenes();
    }, [])
    const manejarSnapshot=(snapshot)=>{
        const ordenes=snapshot.docs.map(doc=>{
            return{
                id:doc.id,
                ...doc.data(),
            }
        })
        setOrdenes(ordenes);
    }

    return ( 
        <Fragment>
            <h1 className="text-3xl font-light mb-4">Ordenes</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
            {ordenes.map(orden=>(
                <Orden
                key={orden.id}
                orden={orden}
                />
            ))}
            </div>
        </Fragment>
     );
}
 
export default Ordenes;