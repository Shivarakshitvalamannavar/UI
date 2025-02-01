import { NextResponse } from "next/server";
import paymentSchema from "@/models/PaymentSchema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"
export async function POST(req) {
    try {
        const cookieStore=await cookies();
        const token=cookieStore.get("token")?.value;
        if (!token) {
            return new Response(JSON.stringify({ message: "Not authenticated" }), {
              status: 401,
              headers: { "Content-Type": "application/json" },
            });
          }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userEmail = decoded.email;
        if (!userEmail) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
        }

        const payment = new paymentSchema({
            userEmail: userEmail,
            amount: parseFloat(amount),
            status: "pending",
        });

        await payment.save();

        return NextResponse.json({ message: "Payment initiated", payment }, { status: 201 });
    } catch (error) {
        console.error("Payment Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
