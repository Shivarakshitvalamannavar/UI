import { NextResponse } from "next/server";
import PaymentSchema from "@/models/PaymentSchema";

export async function POST(req) {
    try {
        const { userEmail, amount } = await req.json();

        if (!userEmail || amount === undefined) {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        const transaction = await PaymentSchema.findOne({ userEmail, amount, status: "pending" });

        if (!transaction) {
            return NextResponse.json({ error: "Transaction not found or already verified" }, { status: 404 });
        }

        transaction.status = "verified";
        await transaction.save();

        return NextResponse.json({ message: "Transaction verified successfully" }, { status: 200 });
    } catch (error) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
