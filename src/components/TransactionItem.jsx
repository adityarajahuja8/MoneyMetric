import { FiEdit2, FiTrash2, FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";
import {
    HiBriefcase,
    HiCurrencyDollar,
    HiShoppingCart,
    HiTruck,
    HiFilm,
    HiHeart,
    HiLightningBolt,
    HiDotsHorizontal,
} from "react-icons/hi";
import { MdFastfood } from "react-icons/md";

const categoryIcons = {
    salary: <HiBriefcase />,
    freelance: <HiCurrencyDollar />,
    food: <MdFastfood />,
    transport: <HiTruck />,
    shopping: <HiShoppingCart />,
    bills: <HiLightningBolt />,
    entertainment: <HiFilm />,
    health: <HiHeart />,
    other: <HiDotsHorizontal />,
};

export default function TransactionItem({ transaction, onEdit, onDelete }) {
    const { description, amount, type, category, date } = transaction;
    const isIncome = type === "income";

    function formatCurrency(val) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    }

    function formatDate(dateStr) {
        if (!dateStr) return "";
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div className={`transaction-item ${type}`}>
            <div className="transaction-icon-wrapper">
                <div className={`transaction-icon ${category || "other"}`}>
                    {categoryIcons[category] || categoryIcons.other}
                </div>
            </div>
            <div className="transaction-details">
                <span className="transaction-desc">{description}</span>
                <span className="transaction-meta">
                    {category && <span className="transaction-category">{category}</span>}
                    <span className="transaction-date">{formatDate(date)}</span>
                </span>
            </div>
            <div className="transaction-amount-section">
                <span className={`transaction-amount ${isIncome ? "income-text" : "expense-text"}`}>
                    {isIncome ? "+" : "−"}
                    {formatCurrency(amount)}
                </span>
                <span className={`transaction-badge ${type}`}>
                    {isIncome ? <FiArrowUpRight /> : <FiArrowDownRight />}
                    {type}
                </span>
            </div>
            <div className="transaction-actions">
                <button className="action-btn edit-btn" onClick={() => onEdit(transaction)} title="Edit">
                    <FiEdit2 />
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(transaction.id)} title="Delete">
                    <FiTrash2 />
                </button>
            </div>
        </div>
    );
}
