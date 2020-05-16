import React, { useState } from 'react';
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';
import firebase from '../firebase/firebase';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';

const SignUp = () => {

    // State para el spinner
    const [loading, setLoading] = useState(false)

    // Router
    const router = useRouter()

    // Validación del formulario
    const formik = useFormik({
        initialValues: {
            name: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es válido").required("El email no puede ir vació"),
            password: Yup.string().required("El password es obligatorio").min(6, "Debes ingresar minimo 6 caracteres"),
            name: Yup.string().required("Tu nombre es obligatorio"),
            lastName: Yup.string().required("Tu apellido es obligatorio"),
        }),
        onSubmit: async values => {
            
            const { name, lastName, email, password } = values

            try {
                
                // Mostramos el Spinner
                setLoading(true)

                // Registramos el nuevo usuario
                await firebase.signup(name, lastName, email, password)

                // Ocultamos el spinner
                setLoading(false)

                // Lo redirigimos a productos
                router.push("/products")
                
            } catch (error) {
                console.log(error);
            }
            
        }
    })

    return (
        <Layout>
            
            <div className="w-full h-full flex justify-center items-center my-10">

                { loading && <Spinner /> }

                <form 
                    className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
                    onSubmit = { formik.handleSubmit }
                >

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Nombre
                        </label>

                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" 
                            type="text" 
                            placeholder="Tu nombre"
                            value = { formik.values.name }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    { (formik.touched.name && formik.errors.name) && (
                        <div 
                            className = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        >
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.name}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Apellido
                        </label>

                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName" 
                            type="text" 
                            placeholder="Tu Apellido"
                            value = { formik.values.lastName }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    { (formik.touched.lastName && formik.errors.lastName) && (
                        <div 
                            className = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        >
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.lastName}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>

                        <input 
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" 
                            type="email" 
                            placeholder="Correo Electrónico"
                            value = { formik.values.email }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />
                    </div>

                    { (formik.touched.email && formik.errors.email) && (
                        <div 
                            className = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        >
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.email}</p>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Contraseña
                        </label>

                        <input 
                            className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" 
                            type="password" 
                            placeholder="Contraseña"
                            value = { formik.values.password }
                            onChange = { formik.handleChange }
                            onBlur = { formik.handleBlur }
                        />

                    </div>

                    { (formik.touched.password && formik.errors.password) && (
                        <div 
                            className = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        >
                            <p className = "font-bold">Error</p>
                            <p>{formik.errors.password}</p>
                        </div>
                    )}

                    <button 
                        className="bg-orange-700 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full uppercase" 
                        type="submit"
                    >
                        Entrar
                    </button>
                </form>

            </div>
        </Layout>
    );
}
 
export default SignUp;