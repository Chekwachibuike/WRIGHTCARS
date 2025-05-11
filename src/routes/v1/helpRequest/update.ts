import { Request, Response } from "express";
import HelpRequestRepo from "../../../database/repository/helpRequestRepo";
import { updateHelpRequestInput, helpRequestIdInput } from "../../../validationSchema/helpRequest";
import APIResponse from "../../../utils/api";
import { AuthenticatedRequest } from "../../../types/request";

const updateHelpRequestHandler = async (
  req: AuthenticatedRequest & Request<helpRequestIdInput, {}, updateHelpRequestInput>,
  res: Response
) => {
  try {
    if (!req.user) {
      return APIResponse.error("User not authenticated", 401).send(res);
    }

    const helpRequest = await HelpRequestRepo.findById(req.params.id);
    if (!helpRequest) {
      return APIResponse.error("Help request not found", 404).send(res);
    }

    // Check if user is authorized to update
    if (helpRequest.userId !== req.user.id && helpRequest.workerId !== req.user.id) {
      return APIResponse.error("Unauthorized to update this help request", 403).send(res);
    }

    const updatedHelpRequest = await HelpRequestRepo.updateHelpRequest(req.params.id, req.body);
    return APIResponse.success(updatedHelpRequest, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default updateHelpRequestHandler; 