# AWS S3 Setup with Node.js (Using AWS SDK v3)

This guide explains **how to configure AWS S3**, create an **IAM user**, set up **profiles**, and use them in a **Node.js project**. It follows all the steps shown in the code comments and adds detailed explanations so you can confidently upload it to GitHub.

---

# 📌 Overview

You will learn:

* How to create an **IAM User** for S3
* How to assign **AmazonS3FullAccess** permissions
* How to generate and store **Access Keys**
* How to configure **AWS CLI** and **multiple profiles**
* How to use the **AWS SDK v3** in Node.js
* How to list S3 buckets programmatically

---

# 🛠️ 1. Install AWS CLI

If you don’t already have AWS CLI installed:

### Windows

Download installer: [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)

### Verify installation

```
aws --version
```

---

# 🛠️ 2. Configure Default AWS Credentials

Run:

```
aws configure
```

Enter:

* Access Key
* Secret Key
* Region (example: `ap-south-1`)
* Output format (press enter)

This creates two files:

```
~/.aws/credentials
~/.aws/config
```

The SDK automatically reads from these files.

---

# 🧑‍💻 3. Creating an IAM User for Node.js

Follow these steps carefully:

## ✔ Step 1 — Create a new IAM user

Go to:

```
AWS Console → IAM → Users → Create User
```

Give it a name (example: `NodeJs-User`).

Do **NOT** create access keys yet.

---

## ✔ Step 2 — Create an IAM Group with S3 permissions

While creating the user:

* Choose **Create Group**
* Give the group a name
* Add this policy:

```
AmazonS3FullAccess
```

Create the group.

---

## ✔ Step 3 — Add the user to the group

After creating the group, add your `NodeJs-User` to it.

---

## ✔ Step 4 — Generate Access Keys

Go to:

```
IAM → Users → NodeJs-User → Security Credentials
```

Under **Access Keys**, click:

```
Create access key → Application running outside AWS
```

Copy:

* Access Key ID
* Secret Access Key

Keep them safe.

---

# 📝 4. Create a Custom AWS Profile

Open:

```
~/.aws/credentials
```

Add:

```ini
[NodeJs-User]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
region = ap-south-1
```

You can now use this profile inside Node.js.

List available profiles:

```
aws configure list-profiles
```

---

# 🧪 5. Test profile from CLI

```
aws s3 ls --profile NodeJs-User
```

If it lists buckets → profile works.

---

# 📦 6. Install AWS SDK v3

```
npm install @aws-sdk/client-s3
```

---

# 💻 7. Node.js Code to List S3 Buckets

Below is the exact script using the custom profile:

```js
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

// Using AWS profile "NodeJs-User"
const s3Client = new S3Client({
  profile: "NodeJs-User",
});

const command = new ListBucketsCommand();
const res = await s3Client.send(command);
console.log(res);
```

This code:

* Loads credentials from `~/.aws/credentials`
* Uses the profile `NodeJs-User`
* Lists all buckets in your AWS account

---

# 🧯 Common Error: InvalidAccessKeyId

If you see:

```
InvalidAccessKeyId: The AWS Access Key Id you provided does not exist
```

It means:

* The key was deleted in IAM
* Wrong profile name
* Wrong credentials loaded via ENV vars

Fix by:

* Regenerating the key
* Updating credentials file
* Ensuring Node doesn’t use old ENV values

---

# 🎉 Completed!

You now have:

* IAM user with S3 permissions
* AWS CLI configured with profiles
* Node.js script using AWS SDK v3
* Ability to list S3 buckets programmatically

You can now extend this to:

* Upload files
* Delete objects
* Create buckets
* Manage permissions

---

# 📚 Recommended Next Steps

* Implement `PutObjectCommand` to upload files
* Implement file streaming
* Use pre-signed URLs
* Add S3 operations in your MERN backend

---

If you want, I can also create:

* A GitHub repo folder structure
* A more advanced README with screenshots
* S3 upload/download example code
