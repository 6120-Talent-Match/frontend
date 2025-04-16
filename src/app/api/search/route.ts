import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/utils/response-helper";

const POST = async (request: NextRequest) => {
  try {
    const { skills, experience } = await request.json();
    const res = await fetch(`${process.env.BACKEND_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skills: skills,
        experience: experience,
        top_n: 5,
      }),
    });

    const data = await res.json();
    return NextResponse.json(createSuccessResponse({ data: data.data.results }));
  } catch (error) {
    return NextResponse.json(createErrorResponse({ message: "Failed to search" }));
  }
}

export { POST };