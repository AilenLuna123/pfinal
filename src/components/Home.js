import React, { useEffect, useState } from 'react'

import appFirebase from '../credenciales';
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc } from 'firebase/firestore'

const auth = getAuth(appFirebase)
const db = getFirestore(appFirebase)

const Home = ({ correoUsuario }) => {

    const valorInicial = {
        nombre: '',
        apellido: '',
        correo: ''
    }

    // variables de estado
    const [user, setUser] = useState(valorInicial)
    const [lista, setLista] = useState([])
    const [subId, setSubId] = useState('')

    const capturarInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        // console.log(user);
        if(subId === ''){
            try {
                await addDoc(collection(db, 'usuarios'), {
                    ...user
                })
            } catch (error) {
                console.log(error);
            }
        }else{
            await setDoc(doc(db, 'usuarios', subId), {
                ...user
            })
        }
        setUser({ ...valorInicial })
        setSubId('')
    }

    // funcion para renderizar la lista
    useEffect(()=>{
        const getLista = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, 'usuarios'))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({ ...doc.data(), id: doc.id })
                })
                setLista(docs)

            } catch (error) {
                console.log(error);
            }
        }
        getLista()
    }, [lista])

    //funcion para borrar usuarios
    const deleteUser = async(id)=>{
        await deleteDoc(doc(db, 'usuarios', id));
    }

    const getOne = async(id)=>{
        try{
            const docRef = doc(db,'usuarios', id);
            const docSnap = await getDoc(docRef)
            setUser(docSnap.data())
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        if(subId !== ''){
        getOne(subId);
        }
    },[subId])

    return (
        <div className="container">
            <p>Bienvenido, <strong>{correoUsuario}</strong> Haz Iniciado Sesión</p>
            <button className="btn btn-primary" onClick={() => signOut(auth)}>
                Cerrar Sesión
            </button>
            <hr />


            <div className="row">

                {/* formulario del crud */}
                <div className="col-md-4">
                    <h3 className="text-center mb-3">Ingresar Contacto</h3>
                    <form onSubmit={guardarDatos}>
                        <div className="card card-body">

                            <div className="form-group">

                                <input type="text" name="nombre" className="form-control mb-3" placeholder="Ingresar el Nombre" onChange={capturarInputs} value={user.nombre} required />
                                <input type="text" name="apellido" className="form-control mb-3" placeholder="Ingresar el Apellido" onChange={capturarInputs} value={user.apellido} required />
                                <input type="text" name="correo" className="form-control mb-3" placeholder="Ingresar el Correo" onChange={capturarInputs} value={user.correo} required />

                            </div>

                            <button className="btn btn-primary">
                                {subId === '' ? 'Guardar': 'Actualizar'}
                            </button>

                        </div>

                    </form>

                </div>

                {/* lista de usuario */}
                <div className="col-md-8">
                    <h2 className="text-center mb-5">Lista de Usuarios</h2>

                    <div className='container card'>
                    <div className='card-body'>
                        {
                            lista.map(list => (
                                <div key={list.id}>
                                    <p>Nombre: {list.nombre}</p>
                                    <p>Apellido: {list.apellido}</p>
                                    <p>Correo: {list.correo}</p>

                                    <button className="btn btn-danger" onClick={()=>deleteUser(list.id)}>
                                        Eliminar
                                    </button>

                                    <button className="btn btn-success m-1" onClick={()=>setSubId(list.id)}>
                                        Actualizar
                                    </button>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Home;