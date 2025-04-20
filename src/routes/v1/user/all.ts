import { Request, Response } from "express";
import UserRepo from "../../../database/repository/userRepo";
import { successResponse, errorResponse } from "../../../utils/helper";

export const getAllUsersHandler = async (req: Request, res: Response):Promise<any> => {
  try {
    const allUsers = await UserRepo.getAllUsers();
    return successResponse(res, {
      message: "Users fetched successfully",
      data: allUsers,
      statusCode: 200,
      successCode: "USERS_FETCHED_SUCCESSFULLY",
    });
  } catch (error) {
    return errorResponse(res, {
      message: "Failed to fetch users",
      statusCode: 500,
      errorCode: "FAILED_TO_FETCH_USERS",
      details: error instanceof Error ? { error: error.message } : null,
    });
  }
};

