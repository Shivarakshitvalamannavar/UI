import { NextResponse } from "next/server";

import PaymentSchema from "@/models/PaymentSchema";

export async function GET() {
    try {

        const pendingTransactions = await PaymentSchema.find({ status: "pending" });

        return NextResponse.json({ transactions: pendingTransactions }, { status: 200 });
    } catch (error) {
        console.error("Fetch Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
