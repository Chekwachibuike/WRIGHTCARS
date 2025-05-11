import { Request, Response } from "express";
import HelpRequestRepo from "../../../database/repository/helpRequestRepo";
import { createHelpRequestInput } from "../../../validationSchema/helpRequest";
import APIResponse from "../../../utils/api";
import { AuthenticatedRequest } from "../../../types/request";

const createHelpRequestHandler = async (
  req: AuthenticatedRequest & Request<{}, {}, createHelpRequestInput>,
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("User not authenticated", 401).send(res);
    }

    const helpRequest = await HelpRequestRepo.createHelpRequest({
      ...req.body,
      userId: req.user.id,
    });
    
    return APIResponse.success(helpRequest, 201).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default createHelpRequestHandler; 