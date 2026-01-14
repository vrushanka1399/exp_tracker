import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
  authDomain: "ecommerce-auth-c5f4b.firebaseapp.com",
  projectId: "ecommerce-auth-c5f4b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
