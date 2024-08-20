// test
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import Tag from "../models/tagModel.js";
import * as tagService from "../services/tagService.js";
let mongoServer;

const userId = "123456";

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Tag Service", () => {
  let tag1;
  let tag2;
  let tag3;

  beforeEach(async () => {
    await Tag.deleteMany({});
    tag1 = await tagService.createTag(
      {
        title: "Tag 1",
      },
      userId
    );

    tag2 = await tagService.createTag(
      {
        title: "Tag 2",
      },
      userId
    );

    tag3 = await tagService.createTag(
      {
        title: "Tag 3",
      },
      userId
    );
  });

  afterEach(async () => {
    await Tag.deleteMany({});
  });

  test("createTag", async () => {
    const tag = await tagService.createTag(
      {
        title: "Tag 4",
      },
      userId
    );

    expect(tag.title).toBe("Tag 4");
  });

  test("getTags", async () => {
    const tags = await tagService.getTags(userId);

    // expect(tags).toMatchObject([tag1, tag2, tag3]);
    expect(tags).toHaveLength(3);
    expect(tags[0].title).toBe("Tag 1");
    expect(tags[1].title).toBe("Tag 2");
    expect(tags[2].title).toBe("Tag 3");
  });

  test("getTag", async () => {
    const tag = await tagService.getTagById(tag3._id, userId);

    expect(tag.title).toBe("Tag 3");
  });

  test("updateTag", async () => {
    const tag = await tagService.getTagById(tag3._id, userId);
    expect(tag.title).toBe("Tag 3");

    const updatedTag = await tagService.updateTag(
      tag3._id,
      {
        title: "Tag 4",
      },
      userId
    );

    expect(updatedTag.title).toBe("Tag 4");
  });

  test("deleteTag", async () => {
    let tags = await tagService.getTags(userId);

    expect(tags).toHaveLength(3);

    await tagService.deleteTag(tag1._id, userId);

    tags = await tagService.getTags(userId);

    expect(tags).toHaveLength(2);
  });
});
