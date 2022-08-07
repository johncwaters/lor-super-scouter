// Import required AWS SDK clients and commands for Node.js
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";

//https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.Query.html
//https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html

//https://amazon-dynamodb-labs.com/hands-on-labs/explore-cli/cli-scan.html

//example
const paramsexample = {
    // Specify which items in the results are returned.
    FilterExpression: "owner_name = :owner_name AND owner_tag = :owner_tag AND game_region = :game_region",
    ExpressionAttributeValues: {
        ":owner_name": { "S": "Aikado" },
        ":owner_tag": { "S": "Awoo" },
        ":game_region": { "S": "Americas" }, //region is a reserved word for dynamodb
    },
    // Set the projection expression, which the the attributes that you want.
    //ProjectionExpression: "Season, Episode, Title, Subtitle",
    TableName: "Games",
};

//custom Scan function
export async function ddb_batchGetItems(params) {
    try {
        const data = await ddbClient.send(new ScanCommand(params));
        return data;
        //data.Items.forEach(function (element, index, array) {
        //  console.log(element.Title.S + " (" + element.Subtitle.S + ")");});
    } catch (err) {
        console.log("Error", err);
    }
}


