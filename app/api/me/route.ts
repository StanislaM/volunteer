import axios from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const cookie = cookies();
    console.log(cookie.getAll());

    const response = await axios.get("/back/user/me", {
        withCredentials: true,
    });

    const data = await response;

    return NextResponse.json(data);
};
