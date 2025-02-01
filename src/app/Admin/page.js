"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg border border-purple-500">
        <h1 className="text-3xl font-extrabold text-purple-400 mb-4">Admin Page</h1>
        <p className="text-gray-300 text-lg italic mb-6">Mate, Ur an admin now  lol</p>
        <Button
          text={"Verify"}
          onClick={() => router.push("/Verify")}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-500/50"
        />
      </div>
    </div>
  );
}
