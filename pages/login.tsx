import Head from 'next/head'
import { useState } from 'react'

export interface ValidationObject {
    valid:boolean
    message:string
    className?:string
}

export default function Login(){
    const defaultValidationObj:ValidationObject = {valid: false, message: ''}
    const [buttonDisabled, setButtonDisabled] = useState( false )
    const [email, setEmail] = useState( '' )    
    const [emailValidationObj, setEmailValidationObj] = useState( defaultValidationObj )
    const [password, setPassword] = useState( '' )
    const [passwordValidationObj, setPasswordValidationObj] = useState( {...defaultValidationObj} )
    const [formMessage, setFormMessage] = useState('')

    const validarEmail = (correo:string) => {
        const vo:ValidationObject = {...emailValidationObj}
        if( correo.length >= 6 && correo.length <= 50 ) {
            // valido            
            vo.valid = true 
            vo.message = "Email correcto"
            vo.className = "is-valid"
            setEmailValidationObj( vo )
            passwordValidationObj.valid && setButtonDisabled( false )
        } else {
            // no valido            
            vo.valid = false 
            vo.message = "Escriba un email válido"
            vo.className = "is-invalid"
            setEmailValidationObj( vo )
            setButtonDisabled( true )            
        }
    }

    const validarPassword = (contrasena:string) => {
        const vo:ValidationObject = {...passwordValidationObj}
        if( contrasena.length >= 2 && contrasena.length <= 50 ) {
            // valido            
            vo.valid = true 
            vo.message = ""
            vo.className = "is-valid"
            setPasswordValidationObj( vo )
            emailValidationObj.valid && setButtonDisabled( false )
        } else {
            // no valido
            vo.valid = false 
            vo.message = "Contraseña no válida"
            vo.className = "is-invalid"
            setPasswordValidationObj( vo )
            setButtonDisabled( true )            
        }
    }

    const inputEmailOnChange = (event) => {
        const correo = event?.target?.value
        validarEmail( correo )
        setEmail( correo )
    }

    const inputPasswordOnChange = (event) => {
        const contrasena = event?.target?.value
        validarPassword( contrasena )
        setPassword( contrasena )
    }

    const formSubmit = () => {
        setButtonDisabled( true )
        if( emailValidationObj.valid && passwordValidationObj.valid ) {

            return 
        }

        // default error   
        setFormMessage('Revise el usuario y la contraseña ingresadas en el formulario.')     
    }

    return (
        <div className="container-fluid bg-dark vh-100 m-0 p-0">
            
            <Head>
                <title>NextJS JWT Login</title>
                <meta name="description" content="Ejemplo de login usando JWT y bcryptjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="row justify-content-center">

                <div className="py-5 col-md-5 col-lg-3 col-sm-10">
                    <form className="py-5 px-5 mb-5 bg-light rounded-3">
                        
                        <h1 className="fs-3 mb-5 text-center">Login Form</h1>

                        { // muestra los mensajes del formulario
                            formMessage.length > 0 &&                            
                            <div className="alert alert-danger" role="alert">
                               {formMessage}
                            </div>
                            // END form message
                        }                        

                        <div>
                            <label htmlFor="inputEmail" className="visually-hidden">Email</label>
                            <input 
                                id="inputEmail" 
                                className={`form-control form-control-lg ${emailValidationObj.className}`}
                                value={email}                                 
                                type="email"                                 
                                placeholder="Email" 
                                onChange={inputEmailOnChange}
                                required={true}
                                aria-describedby="inputEmailMessage"
                            />                            
                            <div id="inputEmailMessage" className={emailValidationObj.valid?'valid-feedback':'invalid-feedback'}>
                                {emailValidationObj.message}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                            <input                                 
                                className={`form-control form-control-lg ${passwordValidationObj.className}`}
                                value={password} 
                                id="inputPassword" 
                                type="password" 
                                placeholder="Contraseña" 
                                onChange={inputPasswordOnChange}
                                required={true}
                                aria-describedby="inputPasswordMessage"
                            />                            
                            <div id="inputPasswordMessage" className={passwordValidationObj.valid?'valid-feedback':'invalid-feedback'}>
                                {passwordValidationObj.message}
                            </div>
                        </div>

                        <button 
                            type="button"
                            onClick={formSubmit}
                            disabled={buttonDisabled} 
                            className="btn btn-lg btn-primary w-100 text-uppercase mt-3 mb-5"
                        >
                            Ingresar
                        </button>
                    </form>

                </div>{/* .col */}
            </div>{/* .row */}
        </div>
    )
}