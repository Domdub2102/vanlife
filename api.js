// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { useFormAction } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBiAV-WH9oUrjUIu8UOAylePTOOW-tOjLo",
  authDomain: "vanlife-bf036.firebaseapp.com",
  projectId: "vanlife-bf036",
  storageBucket: "vanlife-bf036.firebasestorage.app",
  messagingSenderId: "721858249656",
  appId: "1:721858249656:web:d0deab01a8afb21143054d",
  measurementId: "G-Y617SESTBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

//refactoring the fetching functions
const vansCollectionRef = collection(db, "vans")
const userCollectionRef = collection(db, "users")

export async function getVans() {
    try {
        const snapshot = await getDocs(vansCollectionRef)
        const vans = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        return vans
    } catch (error) {
        console.error("Firestore fetch error:", error)
    }
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const vanQuery = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(query)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function loginUser() {
    return true
}