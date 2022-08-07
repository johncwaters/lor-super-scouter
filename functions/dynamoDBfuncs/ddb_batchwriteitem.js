// Import required AWS SDK clients and commands for Node.js
import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../libs/ddbClient.js";


// example
export const paramsExample = {
    RequestItems: {
        TABLE_NAME: [
            {
                PutRequest: {
                    Item: {
                        KEY: { N: "KEY_VALUE" },
                        ATTRIBUTE_1: { S: "ATTRIBUTE_1_VALUE" },
                        ATTRIBUTE_2: { N: "ATTRIBUTE_2_VALUE" },
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        KEY: { N: "KEY_VALUE" },
                        ATTRIBUTE_1: { S: "ATTRIBUTE_1_VALUE" },
                        ATTRIBUTE_2: { N: "ATTRIBUTE_2_VALUE" },
                    },
                },
            },
        ],
    },
};


//custom function
export async function uploadDbBulk(params) {
    try {
        const data = await ddbClient.send(new BatchWriteItemCommand(params));
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
}

//EXAMPLE USAGE
const params = {
    // Specify which items in the results are returned.
    FilterExpression: "owner_name = :owner_name AND owner_tag = :owner_tag",
    //AND game_region = :game_region",
    ExpressionAttributeValues: {
        ":owner_name": { "S": "Aikado" },
        ":owner_tag": { "S": "Awoo" },
        //":game_region": { "S": "Americas" },
    },
    // Set the projection expression, which the the attributes that you want.
    //ProjectionExpression: "Season, Episode, Title, Subtitle",
    TableName: "Games",
};

//import { ddb_batchGetItems } from './functions/dynamoDBfuncs/ddb_batchgetitems.js';
//var data = await ddb_batchGetItems(params);
//console.log(data);