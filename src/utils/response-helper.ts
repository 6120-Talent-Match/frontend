import StandardResponse from "@/types/standard-response";

/**
 * Creates a success response with the provided data
 */
const createSuccessResponse = <T>({ data }: { data: T }): StandardResponse<T> => {
  return {
    data: data,
    error: null,
  };
};

/**
 * Creates an error response with the provided error code and message
 */
const createErrorResponse = <T>({ message }: { message: string }): StandardResponse<T> => {
  return {
    data: null,
    error: message,
  };
};

export { createSuccessResponse, createErrorResponse };