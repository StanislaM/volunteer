import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const cookie = cookies();
    console.log(cookie.getAll());

    const response = await fetch("https://diplomas.medilawvichi.com/user/me", {
        credentials: "include",
    });

    const data = await response.json();

    return NextResponse.json(data);
};
