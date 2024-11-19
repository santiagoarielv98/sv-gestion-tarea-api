import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma.service";
import { TasksService } from "./tasks.service";

const testTask1 = "Test Task 1";

const taskArray = [
  { title: testTask1 },
  { title: "Test Task 2" },
  { title: "Test Task 3" },
];

const oneTask = taskArray[0];

const db = {
  task: {
    findMany: jest.fn().mockResolvedValue(taskArray),
    findUnique: jest.fn().mockResolvedValue(oneTask),
    findFirst: jest.fn().mockResolvedValue(oneTask),
    create: jest.fn().mockReturnValue(oneTask),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneTask),
    delete: jest.fn().mockResolvedValue(oneTask),
  },
};

describe("TaskService", () => {
  let service: TasksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return an array of tasks", async () => {
      const tasks = await service.findAll();
      expect(tasks).toEqual(taskArray);
    });
  });

  describe("findOne", () => {
    it("should get a single task", () => {
      expect(service.findOne(1)).resolves.toEqual(oneTask);
    });
  });

  describe("create", () => {
    it("should successfully insert a task", async () => {
      const task = await service.create({ title: testTask1 });
      expect(task).toEqual(oneTask);
    });
  });

  describe("update", () => {
    it("should call the update method", async () => {
      const task = await service.update(1, {
        title: testTask1,
      });
      expect(task).toEqual(oneTask);
    });
  });

  describe("delete", () => {
    it("should call the delete method", async () => {
      const task = await service.remove(1);
      expect(task).toEqual(oneTask);
    });
  });
});
