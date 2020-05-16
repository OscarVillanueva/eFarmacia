import app from 'firebase/app';
import "firebase/auth"
import firebaseConfig from './config';

class Firebase { 

    constructor() {
        if(!app.apps.length) app.initializeApp( firebaseConfig )
        this.auth = app.auth()
    }

    // registra un usuario
    async signup(name, lastName, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
        return await newUser.user.updateProfile({
            displayName: `${name} ${lastName}`
        })
    }

    // loggear a un usuario
    async signin(email, password) {
        return await this.auth.signInWithEmailAndPassword(email, password)
    }

    // Cerrar sesión del usuario
    async signout() {
        await this.auth.signOut()
    }
}

const firebase = new Firebase()
export default firebase