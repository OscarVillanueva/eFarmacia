import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import { useRouter } from "next/router";
import * as Yup from 'yup';
import Layout from '../components/Layout';
import firebase from '../firebase/firebase';
import useTranslate from '../hooks/useTranslate';

const Login = () => {

    // Para llevar a productos
    const router = useRouter()

    // State para error
    const [error, setError] = useState(null)

    // Verificar que ya se haya enviado la solicitud, para evitar que se cicle el state
    const [request, setRequest] = useState(false)

    // Validación del formulario
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("El email no es válido").required("El email no puede ir vació"),
            password: Yup.string().required("El password es obligatorio")
        }),
        onSubmit: async values => {
            
            const { email, password } = values

            try {
                
                // Verficamos
                await firebase.signin(email, password)

                // Si existe lo redirigimos a productos
                router.push("/products")

            } catch (error) {
                // Decimos que se hizo la consulta
                setRequest(true)

                // Traducimos el mensaje de error
                const translation = useTranslate(error.code)

                // Mostramos el error
                setError({ 
                    ...error, 
                    message: translation
                })
            }

        }
    })

    return (
        <Layout>
            
            <div className="w-full h-full flex justify-center items-center my-20">

                <form 
                    className="bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs"
                    onSubmit = { formik.handleSubmit }
                >

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

                    { error && (
                        <div 
                            className = "my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
                        >
                            <p className = "font-bold">Error</p>
                            <p>{error.message}</p>
                        </div>
                    )}
                </form>
            </div>
        </Layout>
    );
}
 
export default Login;