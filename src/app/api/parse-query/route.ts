import { NextRequest, NextResponse } from "next/server";
import { createSuccessResponse, createErrorResponse } from "@/utils/response-helper";
import parseQuery from "@/lib/parse-query";

const POST = async (request: NextRequest) => {
  try {
    const { query } = await request.json();
    const parsedQuery = await parseQuery(query);
    return NextResponse.json(createSuccessResponse({ data: parsedQuery }));
  } catch (error) {
    return NextResponse.json(createErrorResponse({ message: "Failed to parse query" }));
  }
}

export { POST };