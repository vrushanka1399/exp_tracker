import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBo8Pwmbti299m4tq4c--iyz2pdn5uB2S8",
  authDomain: "ecommerce-auth-c5f4b.firebaseapp.com",
  databaseURL: "https://ecommerce-auth-c5f4b-default-rtdb.firebaseio.com/",
  projectId: "ecommerce-auth-c5f4b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
