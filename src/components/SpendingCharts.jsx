import { useMemo } from "react";
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from "recharts";

const CATEGORY_COLORS = {
    salary: "#fbbf24",
    freelance: "#f59e0b",
    food: "#fb923c",
    transport: "#38bdf8",
    shopping: "#fb7185",
    bills: "#facc15",
    entertainment: "#f97316",
    health: "#34d399",
    other: "#94a3b8",
};

export default function SpendingCharts({ transactions }) {
    // Pie chart: expense breakdown by category
    const categoryData = useMemo(() => {
        const map = {};
        transactions
            .filter((t) => t.type === "expense")
            .forEach((t) => {
                const cat = t.category || "other";
                map[cat] = (map[cat] || 0) + (t.amount || 0);
            });
        return Object.entries(map)
            .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
            .sort((a, b) => b.value - a.value);
    }, [transactions]);

    // Bar chart: monthly income vs expense
    const monthlyData = useMemo(() => {
        const map = {};
        transactions.forEach((t) => {
            const date = t.date || "";
            const month = date.slice(0, 7); // YYYY-MM
            if (!month) return;
            if (!map[month]) map[month] = { month, income: 0, expense: 0 };
            if (t.type === "income") map[month].income += t.amount || 0;
            else map[month].expense += t.amount || 0;
        });
        return Object.values(map)
            .sort((a, b) => a.month.localeCompare(b.month))
            .slice(-6) // last 6 months
            .map((d) => ({
                ...d,
                label: new Date(d.month + "-01").toLocaleDateString("en-IN", {
                    month: "short",
                    year: "2-digit",
                }),
            }));
    }, [transactions]);

    const hasExpenses = categoryData.length > 0;
    const hasMonthly = monthlyData.length > 0;

    if (!hasExpenses && !hasMonthly) return null;

    function CustomTooltip({ active, payload }) {
        if (!active || !payload?.length) return null;
        return (
            <div className="chart-tooltip">
                <p className="chart-tooltip-label">{payload[0].name || payload[0].payload?.name}</p>
                <p className="chart-tooltip-value">
                    ₹{payload[0].value?.toLocaleString("en-IN")}
                </p>
            </div>
        );
    }

    function BarTooltip({ active, payload, label }) {
        if (!active || !payload?.length) return null;
        return (
            <div className="chart-tooltip">
                <p className="chart-tooltip-label">{label}</p>
                {payload.map((p, i) => (
                    <p key={i} style={{ color: p.color }} className="chart-tooltip-value">
                        {p.name}: ₹{p.value?.toLocaleString("en-IN")}
                    </p>
                ))}
            </div>
        );
    }

    return (
        <div className="charts-section">
            {hasExpenses && (
                <div className="chart-card">
                    <h3 className="chart-title">Spending by Category</h3>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={260}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={95}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((entry, i) => (
                                        <Cell
                                            key={i}
                                            fill={CATEGORY_COLORS[entry.name.toLowerCase()] || CATEGORY_COLORS.other}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="chart-legend">
                            {categoryData.map((entry, i) => (
                                <div key={i} className="chart-legend-item">
                                    <span
                                        className="chart-legend-dot"
                                        style={{
                                            background:
                                                CATEGORY_COLORS[entry.name.toLowerCase()] || CATEGORY_COLORS.other,
                                        }}
                                    />
                                    <span className="chart-legend-label">{entry.name}</span>
                                    <span className="chart-legend-value">
                                        ₹{entry.value.toLocaleString("en-IN")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {hasMonthly && (
                <div className="chart-card">
                    <h3 className="chart-title">Income vs Expenses</h3>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={monthlyData} barGap={4}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="var(--border)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="label"
                                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                                axisLine={{ stroke: "var(--border)" }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: "var(--text-muted)", fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                            />
                            <Tooltip content={<BarTooltip />} />
                            <Legend
                                wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }}
                            />
                            <Bar
                                dataKey="income"
                                name="Income"
                                fill="var(--income)"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={40}
                            />
                            <Bar
                                dataKey="expense"
                                name="Expense"
                                fill="var(--expense)"
                                radius={[6, 6, 0, 0]}
                                maxBarSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
