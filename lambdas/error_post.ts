import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import emailError from "roamjs-components/backend/emailError";
import headers from "roamjs-components/backend/headers";
import type { AxiosError } from "axios";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { subject, message, stack } = JSON.parse(event.body || "{}");
  const error = new Error(message);
  error.stack = stack;
  return emailError(subject, error as AxiosError).then((r) => ({
    statusCode: 200,
    body: JSON.stringify({ success: true }),
    headers,
  }));
};
