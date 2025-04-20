import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { successResponse, errorResponse } from "../../../utils/helper";

export const deleteUserHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return errorResponse(res, {
        message: "Invalid user ID",
        statusCode: 400,
        errorCode: "INVALID_USER_ID",
      });
    }

    const deleted = await UserRepo.deleteUser(userId);
    if (deleted) {
      return successResponse(res, {
        message: "User deleted successfully",
        data: null,
        statusCode: 200,
        successCode: "USER_DELETED_SUCCESSFULLY",
      });
    } else {
      return errorResponse(res, {
        message: "User not found",
        statusCode: 404,
        errorCode: "USER_NOT_FOUND",
        details: null,
      });
    }
  } catch (error) {
    return errorResponse(res, {
      message: "Failed to delete user",
      statusCode: 500,
      errorCode: "FAILED_TO_DELETE_USER",
      details: error instanceof Error ? { error: error.message } : null,
    });
  }
};
