import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import toast from "react-hot-toast";

const CATEGORIES = [
    "salary",
    "freelance",
    "food",
    "transport",
    "shopping",
    "bills",
    "entertainment",
    "health",
    "other",
];

export default function TransactionForm({ onSubmit, onClose, editData }) {
    const [form, setForm] = useState({
        description: "",
        amount: "",
        type: "expense",
        category: "other",
        date: new Date().toISOString().split("T")[0],
    });

    useEffect(() => {
        if (editData) {
            setForm({
                description: editData.description || "",
                amount: editData.amount?.toString() || "",
                type: editData.type || "expense",
                category: editData.category || "other",
                date: editData.date || new Date().toISOString().split("T")[0],
            });
        }
    }, [editData]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.description.trim()) {
            toast.error("Description is required");
            return;
        }
        if (!form.amount || parseFloat(form.amount) <= 0) {
            toast.error("Enter a valid amount");
            return;
        }
        onSubmit(form);
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>{editData ? "Edit Transaction" : "Add Transaction"}</h3>
                    <button className="modal-close" onClick={onClose}>
                        <FiX />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="transaction-form">
                    <div className="form-group">
                        <label htmlFor="form-description">Description</label>
                        <input
                            id="form-description"
                            name="description"
                            type="text"
                            placeholder="e.g. Grocery shopping"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="form-amount">Amount (₹)</label>
                            <input
                                id="form-amount"
                                name="amount"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="0.00"
                                value={form.amount}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-date">Date</label>
                            <input
                                id="form-date"
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="form-type">Type</label>
                            <select
                                id="form-type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                className="filter-select"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="form-category">Category</label>
                            <select
                                id="form-category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="filter-select"
                            >
                                {CATEGORIES.map((c) => (
                                    <option key={c} value={c}>
                                        {c.charAt(0).toUpperCase() + c.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button id="form-submit" type="submit" className="auth-btn">
                        {editData ? "Save Changes" : "Add Transaction"}
                    </button>
                </form>
            </div>
        </div>
    );
}
