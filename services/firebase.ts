import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
export const FirebaseConfig = {
    apiKey: 'AIzaSyCV5h4So0i4hU6XDH7FsHgzgTIu9LCi4gI',
    authDomain: 'marubeni-waste-man.firebaseapp.com',
    projectId: 'marubeni-waste-man',
    storageBucket: 'marubeni-waste-man.appspot.com',
    messagingSenderId: '932265706392',
    appId: '1:932265706392:web:d09deeb7cab5d414bf21ed',
    measurementId: 'G-KZ6GK7530F'
};
export const Firebase = firebase.initializeApp(FirebaseConfig);
export const Firestore = firebase.firestore();

export const provider = new firebase.auth.PhoneAuthProvider;

export const timeStamp = firebase.firestore.FieldValue.serverTimestamp();
