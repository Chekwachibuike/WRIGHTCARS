import { Request, Response } from "express";
import APIResponse from "../../../utils/api";

const logoutHandler = async (req: Request, res: Response) => {
  try {
    console.log("Initiating logout process..."); // Debug log to indicate the start of the process.

    // Debug log to ensure cookies are being targeted correctly.
    console.log("Clearing accessToken cookie...");
    res.clearCookie("accessToken", { httpOnly: true, secure: true });

    console.log("Clearing refreshToken cookie...");
    res.clearCookie("refreshToken", { httpOnly: true, secure: true });

    // Debug log to confirm cookies have been cleared.
    console.log("Cookies cleared successfully!");

    // Send a success response to the client.
    return APIResponse.success("Logged out successfully.", 200).send(res);
  } catch (error) {
    // Debug log for error handling.
    console.error("Error during logout process:", error);

    // Send an error response if something goes wrong.
    return APIResponse.error((error as Error).message, 500).send(res);
  }
};

export default logoutHandler;
