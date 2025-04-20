import { Request, Response } from "express";
import APIResponse from "../../utils/api";
import uploadToS3 from "../../services/aws";
import config from "config";

const awsUpload = async function (req: Request, res: Response) {
  try {
    const files = req.files;
    if (!req.files || !files || !Array.isArray(files) || files.length === 0) {
      throw new Error("Please upload one or more files");
    }

    const uploadPromises = files.map((file: Express.Multer.File) => {
      return new Promise((resolve, reject) => {
        uploadToS3(file, config.get("bucket"))
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.error(error);
            reject(error);
          });
      });
    });

    Promise.all(uploadPromises)
      .then((results) => {
        APIResponse.success(results, 201).send(res);
      })
      .catch((error) => {
        APIResponse.error(error.message).send(res);
      });
  } catch (error: any) {
    APIResponse.error((error as Error).message).send(res);
  }
};

export default awsUpload;
