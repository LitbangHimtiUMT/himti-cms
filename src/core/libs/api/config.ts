import { convertObjectToQueryParams } from "@features/_global/helper";
import { ApiOption, MethodTypes, getContentType } from "./types";

const REQUEST_TIMEOUT_MS = 30000;

let authRedirecting = false;

function handleUnauthorized() {
  localStorage.removeItem("token");
  if (authRedirecting || window.location.pathname === "/admin/login") return;
  authRedirecting = true;
  window.location.replace("/admin/login");
}

async function parseBody(res: Response) {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

const generateEndpoint = (
  endpoint: string,
  path?: string,
  queryParams?: Record<string, string | number | null | undefined>
) => {
  if (!endpoint) return "";
  let result = endpoint;
  if (path) {
    result = `${endpoint}/${path}`;
  }
  if (queryParams) {
    const query = convertObjectToQueryParams(queryParams);
    result = `${result}${query ? `?${query}` : ""}`;
  }
  return result;
};

async function createRequest<Res = unknown, Req = unknown>(
  endpoint: string,
  method: MethodTypes,
  apiOption?: ApiOption,
  body?: Req
) {
  const defaultValue = { ...apiOption };

  const token = localStorage.getItem("token") || "";
  if (token) {
    defaultValue.bearerToken = token;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(
      generateEndpoint(endpoint as string, apiOption?.path || "", {
        ...apiOption?.queryParams,
        ...apiOption?.params,
      }),
      {
        method,
        headers: {
          ...(defaultValue.contentType !== "form-data" && {
            "Content-Type": getContentType(defaultValue?.contentType),
          }),
          ...(defaultValue?.bearerToken &&
            typeof defaultValue.bearerToken !== "undefined" && {
              Authorization: `Bearer ${defaultValue.bearerToken}`,
            }),
          ...defaultValue?.headers,
        },
        body:
          getContentType(defaultValue?.contentType) === "application/json"
            ? JSON.stringify(body)
            : (body as BodyInit),
        signal: controller.signal,
      }
    );
  } catch (err) {
    if (controller.signal.aborted) {
      throw { message: "Request timed out, please try again." };
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }

  const data = await parseBody(res);
  if (!res.ok) {
    if (res.status === 401) handleUnauthorized();
    throw data ?? { message: res.statusText || "Request failed" };
  }
  return data as Res;
}

export const request = {
  get:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "GET", apiOption),
  post:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "POST", apiOption, body),
  put:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "PUT", apiOption, body),
  patch:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (body?: Req, apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "PATCH", apiOption, body),
  delete:
    <Res = unknown, Req = unknown>(endpoint: string) =>
    (apiOption?: ApiOption) =>
      createRequest<Res, Req>(endpoint, "DELETE", apiOption),
};
