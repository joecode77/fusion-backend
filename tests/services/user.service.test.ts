import { AppDataSouce } from "../../src/db";
import * as userService from "../../src/services/user.service";

jest.mock("../../src/db");

describe("User Service", () => {
  let mockRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock the repository methods
    mockRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    // Mock the DataSource to return our mock repository
    AppDataSouce.getRepository = jest.fn().mockReturnValue(mockRepository);
  });

  describe("createUser", () => {
    it("should create and return a new user", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      };

      mockRepository.findOne.mockResolvedValue(null); // No user exists
      mockRepository.create.mockReturnValue(userData);
      mockRepository.save.mockResolvedValue(userData);

      const result = await userService.createUser(userData);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(mockRepository.create).toHaveBeenCalledWith(userData);
      expect(mockRepository.save).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });

    it("should return null if the user already exists", async () => {
      const existingUser = {
        email: "test@example.com",
      };

      mockRepository.findOne.mockResolvedValue(existingUser); // User already exists

      const result = await userService.createUser({
        username: "testuser",
        email: "test@example.com",
        password: "hashedpassword",
      });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(mockRepository.create).not.toHaveBeenCalled();
      expect(mockRepository.save).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("getOneUser", () => {
    it("should return the user if found", async () => {
      const user = {
        uuid: "12345",
        username: "testuser",
        email: "test@example.com",
      };

      mockRepository.findOne.mockResolvedValue(user);

      const result = await userService.getOneUser({
        email: "test@example.com",
      });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(result).toEqual(user);
    });

    it("should return null if the user is not found", async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await userService.getOneUser({
        email: "nonexistent@example.com",
      });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: "nonexistent@example.com" },
      });
      expect(result).toBeNull();
    });
  });
});
