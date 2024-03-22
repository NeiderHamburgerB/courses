import * as AWS from 'aws-sdk';

export class S3Service {

    private s3: AWS.S3;

    constructor() {
        this.s3 = this.setup();
    }

    private setup = () => {
        return new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
            s3ForcePathStyle: true,
            signatureVersion: 'v4'
        });
    }

    uploadFile = async (Key:string, Bucket:string, ContentType:string, Body: Buffer): Promise<string> => {
        
      let { Location } = await this.s3.upload(
        {
          Key,
          Bucket,
          ContentType,
          Body
        }
      ).promise();

      return Location;

    }

  
}
