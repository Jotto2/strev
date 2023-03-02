'use client'
import React from "react";
import { useAuthContext } from "context/AuthContext";
import { useRouter } from "next/navigation";
function Page() {
    const { user } = useAuthContext()
    const router = useRouter()

    return (<h1>Bare innloggede brukere kan se denne siden</h1>);
}

export default Page;