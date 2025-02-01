"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";
export default function VerifyTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router=useRouter();
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch("/api/Transactions/fetch");
                const data = await response.json();

                if (response.ok) {
                    setTransactions(data.transactions);
                } else {
                    setError(data.error || "Failed to fetch transactions");
                }
            } catch (error) {
                setError("Something went wrong!");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    const handleVerify = async (email, amount) => {
        try {
            const response = await fetch("/api/Transactions/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userEmail: email, amount }),
            });

            const data = await response.json();

            if (response.ok) {
                setTransactions((prevTransactions) =>
                    prevTransactions.map((txn) =>
                        txn.userEmail === email && txn.amount === amount
                            ? { ...txn, status: "verified" }
                            : txn
                    )
                );
            } else {
                alert(data.error || "Failed to verify transaction");
            }
        } catch (error) {
            alert("Something went wrong!");
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-[#6e32c9]">Verify These Transactions</h2>
            
            {loading && <p>Loading transactions...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!loading && !error && transactions.length === 0 && (
                <p className="text-gray-500">No pending transactions.</p>
            )}

            <div className="w-full max-w-2xl bg-white p-4 shadow-md rounded-lg">
                {transactions.map((txn) => (
                    <div key={txn._id} className="flex justify-between items-center p-3 border-b">
                        <div>
                            <p className="text-lg font-medium">Email: {txn.userEmail}</p>
                            <p className="text-gray-600">Amount: ${txn.amount.toFixed(2)}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-md">Pending</span>
                            <button
                                onClick={() => handleVerify(txn.userEmail, txn.amount)}
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Button
                        text={"Done"}
                        onClick={() => router.push("/Admin")}
                        className="w-full"
                      />
        </div>
    );
}
