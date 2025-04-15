interface StandardResponse<T> {
  data: T | null;
  error: string | null;
}

export default StandardResponse;