const useTranslate = code => {

    let translation = ""

    switch (code) {
        case "auth/email-already-in-use":
            translation = "Esa cuenta de correo ya está en uso. Prueba con otra"
            break;
    
        case "auth/user-not-found":
        case "auth/wrong-password":
            translation = "La contraseña o el correo son incorrectos"
            break;

        default:
            break;
    }

    return translation;
}
 
export default useTranslate;