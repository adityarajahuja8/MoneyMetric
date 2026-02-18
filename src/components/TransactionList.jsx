
import TransactionItem from "./TransactionItem";
import { FiInbox } from "react-icons/fi";

export default function TransactionList({ transactions, onEdit, onDelete }) {
    if (!transactions || transactions.length === 0) {
        return (
            <div className="transaction-list-empty">
                <FiInbox className="empty-icon" />
                <h3>No transactions yet</h3>
                <p>Add your first income or expense to get started!</p>
            </div>
        );
    }

    return (
        <div className="transaction-list">
            <div className="transaction-list-header">
                <h3>Recent Transactions</h3>
                <span className="transaction-count">{transactions.length} entries</span>
            </div>
            <div className="transaction-list-items">
                {transactions.map((t) => (
                    <TransactionItem
                        key={t.id}
                        transaction={t}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
}
