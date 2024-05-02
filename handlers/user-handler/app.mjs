import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDBClient({});    
const docClient = DynamoDBDocumentClient.from(dynamoDb);


const respond = (r) => {
  return {
    statusCode: 200,
    body: JSON.stringify(r)
  }
}

export const lambdaHandler = async (event, context) => {
  let body = event.body != undefined && typeof event.body === "string" ? JSON.parse(event.body) : event.body;

  if (event.routeKey === 'POST /api/User') {
    let id = uuidv4().replaceAll("-","")
    let name = body.name;
    let surname = body.surname;

    let date = new Date();
    let epochNow = date.getTime();

    let user = {
      id,
      name,
      surname,
      creationDate: epochNow
    };

    let command = new PutCommand({
      TableName: "PresentationExampleUser",
      Item: user
    });

    await docClient.send(command);

    return respond(user);
  }
  else if (event.routeKey === 'GET /api/User') {
    let command = new ScanCommand({
      TableName: "PresentationExampleUser",
    });

    let result = await docClient.send(command);
    let users = result.Items ?? [];

    return respond(users);
  }
};
