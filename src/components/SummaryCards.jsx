import { FiArrowUpRight, FiArrowDownRight, FiActivity } from "react-icons/fi";
import { LuIndianRupee } from "react-icons/lu";

export default function SummaryCards({ transactions }) {
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + (t.amount || 0), 0);

    const balance = income - expenses;
    const ratio = income > 0 ? Math.min((expenses / income) * 100, 100) : 0;

    const todayCount = transactions.filter((t) => {
        const today = new Date().toISOString().split("T")[0];
        return t.date === today;
    }).length;

    function formatCurrency(val) {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    }

    return (
        <div className="summary-cards">
            <div className="summary-card balance-card">
                <div className="summary-card-icon">
                    <LuIndianRupee />
                </div>
                <div className="summary-card-info">
                    <span className="summary-label">Total Balance</span>
                    <span className="summary-value">{formatCurrency(balance)}</span>
                    <div className="summary-ratio">
                        <div className="ratio-bar">
                            <div
                                className="ratio-fill"
                                style={{ width: `${ratio}%` }}
                            />
                        </div>
                        <span className="ratio-text">{ratio.toFixed(0)}% spent</span>
                    </div>
                </div>
                <div className="summary-card-glow"></div>
            </div>
            <div className="summary-card income-card">
                <div className="summary-card-icon income">
                    <FiArrowUpRight />
                </div>
                <div className="summary-card-info">
                    <span className="summary-label">Income</span>
                    <span className="summary-value income-text">{formatCurrency(income)}</span>
                </div>
                <div className="summary-card-glow"></div>
            </div>
            <div className="summary-card expense-card">
                <div className="summary-card-icon expense">
                    <FiArrowDownRight />
                </div>
                <div className="summary-card-info">
                    <span className="summary-label">Expenses</span>
                    <span className="summary-value expense-text">{formatCurrency(expenses)}</span>
                </div>
                <div className="summary-card-glow"></div>
            </div>
            {todayCount > 0 && (
                <div className="summary-card activity-card">
                    <div className="summary-card-icon activity">
                        <FiActivity />
                    </div>
                    <div className="summary-card-info">
                        <span className="summary-label">Today</span>
                        <span className="summary-value">{todayCount} txn{todayCount > 1 ? "s" : ""}</span>
                    </div>
                    <div className="summary-card-glow"></div>
                </div>
            )}
        </div>
    );
}
