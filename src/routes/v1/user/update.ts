import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { successResponse, errorResponse } from "../../../utils/helper";

export const updateUserHandler = async (req: Request, res: Response): Promise<any> => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return errorResponse(res, {
        message: "Invalid user ID",
        statusCode: 400,
        errorCode: "INVALID_USER_ID",
      });
    }

    const updateData = req.body;
    const updatedUser = await UserRepo.updateUser(updateData, userId);

    if (updatedUser) {
      const { password: _, ...userWithoutPassword } = updatedUser.get({ plain: true });
      return successResponse(res, {
        message: "User updated successfully",
        data: userWithoutPassword,
        statusCode: 200,
        successCode: "USER_UPDATED_SUCCESSFULLY",
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
      message: "Failed to update user",
      statusCode: 500,
      errorCode: "FAILED_TO_UPDATE_USER",
      details: error instanceof Error ? { error: error.message } : null,
    });
  }
};
