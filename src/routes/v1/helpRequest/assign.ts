import { Request, Response } from "express";
import HelpRequestRepo from "../../../database/repository/helpRequestRepo";
import { helpRequestIdInput } from "../../../validationSchema/helpRequest";
import APIResponse from "../../../utils/api";
import { AuthenticatedRequest } from "../../../types/request";

const assignWorkerHandler = async (
  req: Request & AuthenticatedRequest,
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

    // Only workers can assign themselves
    if (req.user.role !== 'worker') {
      return APIResponse.error("Only workers can assign themselves to help requests", 403).send(res);
    }

    const updatedHelpRequest = await HelpRequestRepo.assignWorker(req.params.id, req.user.id);
    return APIResponse.success(updatedHelpRequest, 200).send(res);
  } catch (error) {
    return APIResponse.error((error as Error).message).send(res);
  }
};

export default assignWorkerHandler; 