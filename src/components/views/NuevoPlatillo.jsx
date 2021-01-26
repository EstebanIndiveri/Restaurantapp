import React, { Fragment ,useContext,useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {
// 
const [upload, setUpload] = useState(false);
const [progress, setProgress] = useState(0);
const [urlImage, setUrlImage] = useState('');

    // context auth
    const {firebase} = useContext(FirebaseContext);

    // console.log(firebase);
    // hook redirect
    const navigate=useNavigate();

// validate formik
const formik=useFormik({
    initialValues:{
        nombre:'',
        precio:'',
        categoria:'',
        imagen:'',
        descripcion:'',
    },
    validationSchema:Yup.object({
        nombre:Yup.string().min(3,'Los platillos deben tener minimo 3 caracteres').required('El nombre es obligatiorio'),
        precio:Yup.string().min(1,'Debes agregar un número').required('El precio es obligatiorio'),
        categoria:Yup.string().required('La categoría es obligatioria'),
        descripcion:Yup.string().min(5,'La descripción debe ser más larga').required('La descripción es obligatioria'),
    }),
    onSubmit:platillo=>{
        try {
            platillo.imagen=urlImage;
            platillo.existencia=true;
            firebase.db.collection('productos').add(platillo)
            // 
            navigate('/menu');
        } catch (error) {
            console.log(error);
            
        }
    }
});

const handleUploadStart=()=>{
    setProgress(0);
    setUpload(true);
}
const handleUploadError=(error)=>{
    setUpload(false);
    console.log(error);
}
const handleUploadSuccess=async (name)=>{
    setProgress(100);
    setUpload(false);
    // url del image
    const url=await firebase.storage.ref('productos').child(name).getDownloadURL();
    console.log(url);
    setUrlImage(url);
}

const handleProgress=(progreso)=>{
    setProgress(progreso)
    console.log(progreso);
}

    return ( 
        <Fragment>
            <h1 className="text-3xl font-light mb-4"> Agregar Platillo</h1>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl ">
                    <form onSubmit={formik.handleSubmit} >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre" >Nombre</label>
                            <input
                                id="nombre"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-100 ease-in-out"
                                type="text"
                                placeholder="Nombre del platillo"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.nombre&&formik.errors.nombre?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 transition-all duration-300 ease-in-out" role="alert">
                                <p className="font-bold">{formik.errors.nombre}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio" >Precio</label>
                            <input
                                id="precio"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-100 ease-in-out"
                                type="number"
                                placeholder="250"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.precio&&formik.errors.precio?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 transition-all duration-300 ease-in-out" role="alert">
                                <p className="font-bold">{formik.errors.precio}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria" >Categoria</label>
                            <select
                            id="categoria"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-100 ease-in-out"
                            name="categoria"
                            value={formik.values.categoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">--Seleccione--</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="comida">Comida</option>
                                <option value="cena">Cena</option>
                                <option value="bebida">Bebida</option>
                                <option value="postre">Postre</option>
                                <option value="ensalada">Ensalada</option>
                            </select>
                        </div>
                        {formik.touched.categoria&&formik.errors.categoria?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 transition-all duration-300 ease-in-out" role="alert">
                                <p className="font-bold">{formik.errors.categoria}</p>
                            </div>
                        ):null}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen" >Imagen</label>
                            <FileUploader
                            accept='image/*'
                            id="imagen"
                            name="imagen"
                            randomizeFilename
                            storageRef={firebase.storage.ref('productos')}
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                            // metadata={{cacheControl: 'max-age=3600'}}
                            />
                        </div>
                        {upload&&(
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width:`${progress}%`}}>
                                    {progress}
                                </div>
                            </div>
                        )}
                        {urlImage&&(
                            <p className="bg-green-500 text-white p-3 text-center my-5">
                                La imagen se subió correctamente
                            </p>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion" >Descripción</label>
                            <textarea
                                id="descripcion"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all duration-100 ease-in-out h-40"
                                placeholder="Descripción del platillo"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                            ></textarea>
                        </div>
                        {formik.touched.descripcion&&formik.errors.descripcion?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5 transition-all duration-300 ease-in-out" role="alert">
                                <p className="font-bold">{formik.errors.nombre}</p>
                            </div>
                        ):null}
                        <input
                        type="submit"
                        className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold  transition-all duration-300 ease-in-out text-center cursor-pointer"
                        value="Agregar platillo"
                        />
                    </form>
                </div>
            </div>
        </Fragment>
        );
}
 
export default NuevoPlatillo;