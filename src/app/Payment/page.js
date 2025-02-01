 "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Button from "@/components/button/button";
// import Image from "next/image";

// export default function Payment() {
//     const [amount, setAmount] = useState("");
//     const [showImage, setShowImage] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handlePayment = async () => {
//         if (!amount || parseFloat(amount) <= 0) return;

//         setLoading(true);

//         try {
//             const response = await fetch("/api/Payment", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ amount }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setShowImage(true);
//             } else {
//                 alert(data.error || "Payment processing failed");
//             }
//         } catch (error) {
//             alert("Something went wrong!");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen bg-[#4e5b46] p-4">
//             <div className="bg-[#b8d8a6] p-6 rounded-lg shadow-lg w-96 text-center border-2 border-[#6e32c9]">
//                 <h2 className="text-2xl font-bold mb-4 text-[#6e32c9]">Enter Payment Amount</h2>
//                 <input 
//                     type="number" 
//                     value={amount} 
//                     onChange={(e) => setAmount(e.target.value)} 
//                     className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
//                     placeholder="Enter amount"
//                 />
//                 {!showImage && (
//                     <Button 
//                         onClick={handlePayment} 
//                         className="w-full bg-[#6e32c9] p-2 rounded-md hover:bg-[#8c46e6] text-white"
//                         disabled={loading}
//                     >
//                         {loading ? "Processing..." : "Proceed"}
//                     </Button>
//                 )}
//                 {showImage && (
//                     <div className="mt-4">
//                         <Image src="/qr.jpg" alt="QR Code" width={200} height={200} />
//                         <p className="mt-2 text-sm text-[#6e32c9]">Please enter the amount after scanning QR.</p>
//                     </div>
//                 )}
//                 <Button
//                             text={"Back"}
//                             onClick={() => router.push("/homePage")}
//                             className="w-full"
//                           />
                
//             </div>
//         </div>
//     );
// }
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/button/button";
import Image from "next/image";

export default function Payment() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialAmount = searchParams.get("amount") || "";
    
    const [amount, setAmount] = useState(initialAmount);
    const [showImage, setShowImage] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (initialAmount) {
            setAmount(initialAmount);
        }
    }, [initialAmount]);

    const handlePayment = async () => {
        if (!amount || parseFloat(amount) <= 0) return;

        setLoading(true);

        try {
            const response = await fetch("/api/Payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            const data = await response.json();

            if (response.ok) {
                setShowImage(true);
            } else {
                alert(data.error || "Payment processing failed");
            }
        } catch (error) {
            alert("Something went wrong!");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#4e5b46] p-4">
            <div className="bg-[#b8d8a6] p-6 rounded-lg shadow-lg w-96 text-center border-2 border-[#6e32c9]">
                <h2 className="text-2xl font-bold mb-4 text-[#6e32c9]">Enter Payment Amount</h2>
                <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded-md mb-4 text-black"
                    placeholder="Enter amount"
                />
                {!showImage && (
                    <Button 
                        onClick={handlePayment} 
                        className="w-full bg-[#6e32c9] p-2 rounded-md hover:bg-[#8c46e6] text-white"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Proceed"}
                    </Button>
                )}
                {showImage && (
                    <div className="mt-4">
                        <Image src="/qr.jpg" alt="QR Code" width={200} height={200} />
                        <p className="mt-2 text-sm text-[#6e32c9]">Please enter the amount after scanning QR.</p>
                    </div>
                )}
                <Button
                    text={"Back"}
                    onClick={() => router.push("/homePage")}
                    className="w-full"
                />
            </div>
        </div>
    );
}
