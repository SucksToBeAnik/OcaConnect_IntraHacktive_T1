import { Resend } from "resend";

/**
 * General response to return after db queries
 * @param {boolean} success
 * @param {string} message
 * @param {*} data
 * @returns {object}
 */
export function responseToReturn(success, message, data) {
  return {
    success: success,
    message: message,
    data: data,
  };
}

export const resend = new Resend(process.env.RESEND_API_KEY);
