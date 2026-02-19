import { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import SpendingCharts from "../components/SpendingCharts";
import FilterBar from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";
import { useTransactions } from "../hooks/useTransactions";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Dashboard() {
    const { transactions, loading, addTransaction, updateTransaction, deleteTransaction } =
        useTransactions();

    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [filters, setFilters] = useState({
        search: "",
        type: "all",
        sort: "newest",
        category: "all",
    });

    const filtered = useMemo(() => {
        let list = [...transactions];

        // Search
        if (filters.search.trim()) {
            const q = filters.search.toLowerCase();
            list = list.filter(
                (t) =>
                    t.description?.toLowerCase().includes(q) ||
                    t.category?.toLowerCase().includes(q)
            );
        }

        // Type filter
        if (filters.type !== "all") {
            list = list.filter((t) => t.type === filters.type);
        }

        // Category filter
        if (filters.category !== "all") {
            list = list.filter((t) => t.category === filters.category);
        }

        // Sort
        switch (filters.sort) {
            case "oldest":
                list.sort((a, b) => {
                    const da = a.date || "";
                    const db = b.date || "";
                    return da.localeCompare(db);
                });
                break;
            case "newest":
                list.sort((a, b) => {
                    const da = a.date || "";
                    const db = b.date || "";
                    return db.localeCompare(da);
                });
                break;
            case "highest":
                list.sort((a, b) => (b.amount || 0) - (a.amount || 0));
                break;
            case "lowest":
                list.sort((a, b) => (a.amount || 0) - (b.amount || 0));
                break;
            default:
                break;
        }

        return list;
    }, [transactions, filters]);

    async function handleAdd(data) {
        try {
            await addTransaction(data);
            toast.success("Transaction added!");
            setShowForm(false);
        } catch {
            toast.error("Failed to add transaction");
        }
    }

    async function handleUpdate(data) {
        if (!editData) return;
        try {
            await updateTransaction(editData.id, data);
            toast.success("Transaction updated!");
            setEditData(null);
            setShowForm(false);
        } catch {
            toast.error("Failed to update");
        }
    }

    async function handleDelete(id) {
        if (!window.confirm("Delete this transaction?")) return;
        try {
            await deleteTransaction(id);
            toast.success("Deleted!");
        } catch {
            toast.error("Failed to delete");
        }
    }

    function handleEdit(transaction) {
        setEditData(transaction);
        setShowForm(true);
    }

    function handleCloseForm() {
        setShowForm(false);
        setEditData(null);
    }

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading your finances…</p>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <Navbar />
            <main className="dashboard-main">
                <div className="dashboard-header">
                    <div>
                        <h1>Dashboard</h1>
                        <p className="dashboard-subtitle">Track your income & expenses</p>
                    </div>
                </div>
                <SummaryCards transactions={transactions} />
                <SpendingCharts transactions={transactions} />
                <FilterBar filters={filters} setFilters={setFilters} />
                <TransactionList
                    transactions={filtered}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </main>

            <footer className="site-footer">
                <span>© {new Date().getFullYear()} Money Metric</span>
                <span className="footer-dot">·</span>
                <span>Built for smarter finances</span>
            </footer>

            <button
                id="add-transaction-fab"
                className="fab"
                onClick={() => {
                    setEditData(null);
                    setShowForm(true);
                }}
                title="Add Transaction"
            >
                <FiPlus />
            </button>

            {showForm && (
                <TransactionForm
                    onSubmit={editData ? handleUpdate : handleAdd}
                    onClose={handleCloseForm}
                    editData={editData}
                />
            )}
        </div>
    );
}
