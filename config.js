import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCiYErG7LLPZOmRBHPFdDNil_krCyMKhL8",
    authDomain: "timetable-app-89b65.firebaseapp.com",
    databaseURL: "https://timetable-app-89b65-default-rtdb.firebaseio.com",
    projectId: "timetable-app-89b65",
    storageBucket: "timetable-app-89b65.appspot.com",
    messagingSenderId: "170042882229",
    appId: "1:170042882229:web:1ae21f66ec402c0fc226fc"
  };

//firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}
export default firebase.firestore();