import { useState, useEffect } from "react";
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export function useTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        const colRef = collection(db, "users", currentUser.uid, "transactions");
        const q = query(colRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setTransactions(data);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    async function addTransaction(data) {
        if (!currentUser) return;
        const colRef = collection(db, "users", currentUser.uid, "transactions");
        await addDoc(colRef, {
            ...data,
            amount: parseFloat(data.amount),
            createdAt: serverTimestamp(),
        });
    }

    async function updateTransaction(id, data) {
        if (!currentUser) return;
        const docRef = doc(db, "users", currentUser.uid, "transactions", id);
        await updateDoc(docRef, {
            ...data,
            amount: parseFloat(data.amount),
        });
    }

    async function deleteTransaction(id) {
        if (!currentUser) return;
        const docRef = doc(db, "users", currentUser.uid, "transactions", id);
        await deleteDoc(docRef);
    }

    return {
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
    };
}
