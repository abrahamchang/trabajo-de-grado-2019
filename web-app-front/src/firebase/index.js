import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firebase-firestore';
import 'firebase/firebase-storage';

import firebaseConfig from './config';

class Firebase {
    isLogged = undefined;
    user = {};
    uid;
    callbackArray = [];
    unsubscribeArray = [];

    constructor() {
        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.auth.onAuthStateChanged(user => {
            this.isLogged = Boolean(user);
            this.user = user;
            this.callbackArray.forEach(callback => callback(this.isLogged));
            this.uid = user ? user.uid : user;
        });
    }

    subscribeToAuthChange(callback) {
        if (typeof callback === 'function') {
            this.callbackArray.push(callback);
            const n = this.callbackArray.length - 1;
            return () => {
                this.callbackArray.splice(n, 1);
            };
        }
    }

    logout() {
        return this.auth.signOut();
    }

    signIn(email, password) {
        //console.log(email, password);
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    async register(email, password, firstName, lastName) {
        //console.log(email, password, firstName, lastName);
        await this.auth.createUserWithEmailAndPassword(email, password);
        return this.auth.currentUser.updateProfile({
            displayName: `${firstName} ${lastName}`,
        });
    }

    getDisplayName() {
        if (this.auth.currentUser) {
            return this.auth.currentUser.displayName;
        }
        return false
    }

    uploadFile(file) {
        const storageRef = this.storage.ref(`/resumes/${file.name}`);
        const task = storageRef.put(file);
        return task;
    }

    uploadCurriculum(curriculumData) {
        return this.db.collection('Curriculums').add(curriculumData)
    }

    getCurriculumByDiscoveryId(id) {

        return this.db.collection('Curriculums').where('discoveryId', '==', id).get();
    }
}

export default new Firebase();