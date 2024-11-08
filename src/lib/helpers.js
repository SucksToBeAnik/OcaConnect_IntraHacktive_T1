import { Resend } from "resend";

export function responseToReturn(success, message, data) {
  return {
    success: success,
    message: message,
    data: data,
  };
}


export const resend = new Resend(process.env.RESEND_API_KEY);
