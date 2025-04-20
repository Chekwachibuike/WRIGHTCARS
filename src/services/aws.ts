import config from "config";
import AWS from "aws-sdk";
import { Express } from "express";
import { Multer } from "multer";
const uploadToS3 = async (file: Express.Multer.File, bucketName: string) => {
  try {
    const s3 = new AWS.S3({
      credentials: {
        accessKeyId: config.get("access_key"),
        secretAccessKey: config.get("secret_key"),
      },
    });
    const fileNameArr = file.filename.split(".");
    console.log(fileNameArr);
    const newFileName = `${fileNameArr[0]}-${Date.now().toString()}.${
      fileNameArr[1]
    }`;
    console.log(file, newFileName);
    const params = {
      Bucket: bucketName,
      Key: newFileName,
      Body: file.path,
    };
    return new Promise((resolve, reject) => {
      s3.upload(
        params,
        {},
        (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log(data);
          resolve(data);
        }
      );
    });
  } catch (error) {
    return error;
  }
};

export default uploadToS3;
