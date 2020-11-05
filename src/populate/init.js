const studentsInitial = require('./students.js');

const admin = require('firebase-admin');

let serviceAccount = require('/Users/fmanzano/Documents/paysheet-e9592-firebase-adminsdk-1vogc-46129cf824.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();
console.log(studentsInitial);
let studentsRef = db.collection('students');
studentsInitial.map(s => {
    return {
        'firstName': s.nombres,
        'lastName': s.apellidos,
        'cedula': s.cedula,
        'classroom': s.salon
    }
}).forEach(e => {
    studentsRef.add(e);
})

/*
db.collection('students').get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, '=>', doc.data());
        });
    })
    .catch((err) => {
        console.log('Error getting documents', err);
    });*/
