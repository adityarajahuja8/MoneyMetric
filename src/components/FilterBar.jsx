import { FiSearch } from "react-icons/fi";

export default function FilterBar({ filters, setFilters }) {
    return (
        <div className="filter-bar">
            <div className="filter-search">
                <FiSearch className="filter-search-icon" />
                <input
                    id="filter-search-input"
                    type="text"
                    placeholder="Search transactions…"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
            </div>
            <div className="filter-controls">
                <select
                    id="filter-type"
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <select
                    id="filter-sort"
                    value={filters.sort}
                    onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                    className="filter-select"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                </select>
                <select
                    id="filter-category"
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="filter-select"
                >
                    <option value="all">All Categories</option>
                    <option value="salary">Salary</option>
                    <option value="freelance">Freelance</option>
                    <option value="food">Food</option>
                    <option value="transport">Transport</option>
                    <option value="shopping">Shopping</option>
                    <option value="bills">Bills</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    );
}
