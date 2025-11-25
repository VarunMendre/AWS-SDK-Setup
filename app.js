import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

/**
 * There are 3 ways to configure AWS credentials for S3Client
 */

/* ----------------------------------------------------------
 * (i) Passing credentials directly in the S3Client options
 * ----------------------------------------------------------
 */
// const s3Client = new S3Client({
//   region: "ap-south-1",
//   credentials: {
//     accessKeyId: "YOUR_ACCESS_KEY",
//     secretAccessKey: "YOUR_SECRET_KEY",
//   },
// });

/* ----------------------------------------------------------
 * (ii) Using default AWS CLI credentials
 * ----------------------------------------------------------
 * When you run `aws configure`, the AWS CLI creates two files:
 *   ~/.aws/credentials
 *   ~/.aws/config
 *
 * The SDK automatically reads credentials from these files.
 */
// const s3Client = new S3Client();

/* ----------------------------------------------------------
 * (iii) Using a custom AWS CLI profile
 * ----------------------------------------------------------
 * Steps to create a profile:
 *
 * 1. Create an IAM user (without generating access keys yet).
 * 2. While creating the user → select “Create Group”.
 * 3. Give the group a name and attach the policy:
 *      AmazonS3FullAccess
 * 4. Add the user to this group and complete user creation.
 *
 * 5. Now open:
 *      IAM → Users → <your-user> → Security Credentials
 *    and generate an Access Key + Secret Key.
 *
 * 6. Add this profile to the credentials file (~/.aws/credentials):
 *
 *    [NodeJs-User]
 *    aws_access_key_id = YOUR_ACCESS_KEY
 *    aws_secret_access_key = YOUR_SECRET_KEY
 *    region = ap-south-1
 *
 * 7. Use the `profile` attribute inside S3Client options.
 */
const s3Client = new S3Client({
  profile: "NodeJs-User",
});

// List all S3 buckets
const command = new ListBucketsCommand();
const res = await s3Client.send(command);

console.log(res);

