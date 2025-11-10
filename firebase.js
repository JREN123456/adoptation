 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
        import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Global Firebase variables provided by the environment
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
        const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

        let db, auth;

        // Initialize Firebase
        if (Object.keys(firebaseConfig).length > 0) {
            const app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            setLogLevel('Debug'); // Enable detailed logging

            // Handle Authentication
            if (initialAuthToken) {
                signInWithCustomToken(auth, initialAuthToken).catch(err => {
                    console.error("Custom token sign-in failed:", err);
                    signInAnonymously(auth);
                });
            } else {
                signInAnonymously(auth);
            }

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    console.log("User signed in:", user.uid);
                } else {
                    console.log("User signed out/anonymous.");
                }
            });
        } else {
            console.error("Firebase configuration not found. Firestore features will not work.");
        }