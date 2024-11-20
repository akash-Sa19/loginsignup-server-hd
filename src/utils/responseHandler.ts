import express from "express";

// Define types for success and error responses
type SuccessResponse = {
  status: "success";
  message: string;
  body: object;
};

type ErrorResponse = {
  status: "error";
  message: string;
  error?: object | null; // Optional property for error details
};

// Helper function to send success responses
const sendSuccessResponse = (
  res: express.Response,
  message: string,
  body: object = {}
): express.Response<SuccessResponse> => {
  return res.status(200).json({ status: "success", message, body });
};

// Helper function to send error responses
const sendErrorResponse = (
  res: express.Response,
  statusCode: number,
  message: string,
  error: object | null = null
): express.Response<ErrorResponse> => {
  return res.status(statusCode).json({ status: "error", message, error });
};

export { sendSuccessResponse, sendErrorResponse };
