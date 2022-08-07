//ALL AWS DB STUFFS
import 'dotenv/config'

//AWS DynamoDB
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
// Set the AWS Region.
const REGION = process.env.AWS_REGION; //e.g. "us-east-1"

// ====== SQL FANCY STUFFS HERE ======
// a client can be shared by different commands.
const ddbClient = new DynamoDBClient({ region: REGION });
export { ddbClient };
