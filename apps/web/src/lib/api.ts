import type {
  ApiErrorResponse,
  ApiSuccessResponse,
  CreateLeadInput,
  Lead,
} from "@/types/lead";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:4000";

export class ApiError extends Error {
  status: number;
  code?: string;
  errors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    code?: string,
    errors?: Record<string, string>,
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
  }
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const body = (await response.json()) as
    | ApiSuccessResponse<T>
    | ApiErrorResponse;

  if (!response.ok || body.success === false) {
    throw new ApiError(
      body.message || "Request failed",
      response.status,
      body.success === false ? body.code : undefined,
      body.success === false ? body.errors : undefined,
    );
  }

  return body.data;
}

export function getLeads(): Promise<Lead[]> {
  return request<Lead[]>("/leads");
}

export function createLead(
  input: CreateLeadInput,
): Promise<Lead> {
  return request<Lead>("/leads", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
