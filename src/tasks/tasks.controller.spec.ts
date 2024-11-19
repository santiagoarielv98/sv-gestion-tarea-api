import { Test } from "@nestjs/testing";
import { TasksController } from "./tasks.controller";
import { TaskResponseDto } from "./dto/task-response.dto";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

const testTasks1 = "Test Tasks 1";

describe("Tasks Controller", () => {
  let controller: TasksController;
  let service: TasksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            findAll: jest.fn<TaskResponseDto[], []>().mockImplementation(() => [
              { id: 1, title: testTasks1 },
              { id: 1, title: "Test Tasks 2" },
              { id: 1, title: "Test Tasks 3" },
            ]),
            findOne: jest
              .fn<Promise<TaskResponseDto>, [string]>()
              .mockImplementation((id) =>
                Promise.resolve({
                  id: 1,
                  title: testTasks1,
                })
              ),
            create: jest
              .fn<Promise<TaskResponseDto>, [TaskResponseDto]>()
              .mockImplementation((tasks) =>
                Promise.resolve({ id: 1, ...tasks })
              ),
            update: jest
              .fn<Promise<TaskResponseDto>, [string, TaskResponseDto]>()
              .mockImplementation((id, tasks) =>
                Promise.resolve({ id, ...tasks })
              ),
          },
        },
      ],
    }).compile();

    controller = module.get(TasksController);
    service = module.get(TasksService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findAll", () => {
    it("should get an array of tasks", async () => {
      await expect(controller.findAll()).resolves.toEqual([
        { title: testTasks1, id: 1 },
        { title: "Test Tasks 2", id: 1 },
        { title: "Test Tasks 3", id: 1 },
      ]);
    });
  });
  describe("findOne", () => {
    it("should get a single tasks", async () => {
      await expect(controller.findOne("1")).resolves.toEqual({
        title: testTasks1,
        id: 1,
      });
      await expect(controller.findOne("3")).resolves.toEqual({
        title: testTasks1,
        id: 1,
      });
    });
  });
  describe("create", () => {
    it("should create a new tasks", async () => {
      const newTasksDTO: CreateTaskDto = {
        title: "New Tasks 1",
      };
      await expect(controller.create(newTasksDTO)).resolves.toEqual({
        id: 1,
        ...newTasksDTO,
      });
    });
  });
  describe("update", () => {
    it("should update a tasks", async () => {
      const newTasksDTO: UpdateTaskDto = {
        title: "New Tasks 1",
      };
      await expect(controller.update("1", newTasksDTO)).resolves.toEqual({
        id: 1,
        ...newTasksDTO,
      });
    });
  });
});
