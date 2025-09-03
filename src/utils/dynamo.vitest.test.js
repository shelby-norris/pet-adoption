import { describe, it, expect, beforeEach } from "vitest";
import { mockClient } from "aws-sdk-client-mock";
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  DeleteCommand
} from "@aws-sdk/lib-dynamodb";

import { createItem, listAllItems, getItem, deleteItem } from "./dynamo";

const ddbMock = mockClient(DynamoDBDocumentClient);

beforeEach(() => {
  ddbMock.reset();
});

describe("CRUD (unit, mocked) with Vitest", () => {
  it("createItem returns the same item", async () => {
    ddbMock.on(PutCommand).resolves({});
    const item = { id: "1", text: "hi" };

    const out = await createItem("Testing", item);

    expect(out).toEqual(item);
  });

  it("ListAllItems returns an array", async () => {
    const mockItems = [{ id: "1" }, { id: "2" }];
    ddbMock.on(ScanCommand).resolves({ Items: mockItems });

    const output = await listAllItems("Test");

    expect(output).toEqual(mockItems);
  });

  it("ListAllItems returns an empty array when empty", async () => {
    ddbMock.on(ScanCommand).resolves({});

    const output = await listAllItems("Test");

    expect(output).toEqual([]);
  });

  it("getItem returns the requested item", async () => {
    const mockItem = { id: "7", name: "Tester" };
    ddbMock.on(GetCommand).resolves({ Item: mockItem });

    const output = await getItem("FakeTable", { id: "7" });

    expect(output).toEqual(mockItem);
  });

  it ("deleteItem returns deleted item", async () => {
    const mockItem = {id: "1", name: "Fake Item"};
    ddbMock.on(DeleteCommand).resolves({Attributes: mockItem});

    const output = await deleteItem("Table", { id: "1"});

    expect(output).toEqual(mockItem);
  })

});