const studentController = require("./studentController");
const studentModel = require("../models/studentModel");

jest.mock("../models/studentModel", () => ({
  getAllStudents: jest.fn(),
  getStudentById: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  patchStudent: jest.fn(),
  deleteStudent: jest.fn(),
}));

const createMockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Student Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getStudents", () => {
    it("calls model and returns students", () => {
      const req = {};
      const res = createMockRes();
      const rows = [{ student_id: 1, first_name: "John" }];

      studentModel.getAllStudents.mockImplementation((cb) => cb(null, rows));

      studentController.getStudents(req, res);

      expect(studentModel.getAllStudents).toHaveBeenCalledWith(expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(rows);
    });

    it("returns 500 when model returns an error", () => {
      const req = {};
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.getAllStudents.mockImplementation((cb) => cb(error));

      studentController.getStudents(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("getStudent", () => {
    it("passes id and returns student result", () => {
      const req = { params: { id: "7" } };
      const res = createMockRes();
      const rows = [{ student_id: 7, first_name: "Ava" }];

      studentModel.getStudentById.mockImplementation((id, cb) => cb(null, rows));

      studentController.getStudent(req, res);

      expect(studentModel.getStudentById).toHaveBeenCalledWith("7", expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(rows);
    });

    it("returns 500 when model returns an error", () => {
      const req = { params: { id: "7" } };
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.getStudentById.mockImplementation((id, cb) => cb(error));

      studentController.getStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("createStudent", () => {
    it("passes body and returns created message with insert id", () => {
      const req = { body: { first_name: "Mia", last_name: "Lee" } };
      const res = createMockRes();
      const result = { insertId: 22 };

      studentModel.createStudent.mockImplementation((data, cb) => cb(null, result));

      studentController.createStudent(req, res);

      expect(studentModel.createStudent).toHaveBeenCalledWith(req.body, expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Student created", id: 22 });
    });

    it("returns 500 when model returns an error", () => {
      const req = { body: { first_name: "Mia" } };
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.createStudent.mockImplementation((data, cb) => cb(error));

      studentController.createStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("updateStudent", () => {
    it("passes id and body and returns updated message", () => {
      const req = { params: { id: "3" }, body: { first_name: "Noah" } };
      const res = createMockRes();

      studentModel.updateStudent.mockImplementation((id, data, cb) => cb(null));

      studentController.updateStudent(req, res);

      expect(studentModel.updateStudent).toHaveBeenCalledWith("3", req.body, expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Student updated" });
    });

    it("returns 500 when model returns an error", () => {
      const req = { params: { id: "3" }, body: { first_name: "Noah" } };
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.updateStudent.mockImplementation((id, data, cb) => cb(error));

      studentController.updateStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("patchStudent", () => {
    it("passes id and body and returns updated message", () => {
      const req = { params: { id: "4" }, body: { phone: "123456789" } };
      const res = createMockRes();

      studentModel.patchStudent.mockImplementation((id, data, cb) => cb(null));

      studentController.patchStudent(req, res);

      expect(studentModel.patchStudent).toHaveBeenCalledWith("4", req.body, expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Student updated" });
    });

    it("returns 500 when model returns an error", () => {
      const req = { params: { id: "4" }, body: { phone: "123456789" } };
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.patchStudent.mockImplementation((id, data, cb) => cb(error));

      studentController.patchStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });

  describe("deleteStudent", () => {
    it("passes id and returns deleted message", () => {
      const req = { params: { id: "8" } };
      const res = createMockRes();

      studentModel.deleteStudent.mockImplementation((id, cb) => cb(null));

      studentController.deleteStudent(req, res);

      expect(studentModel.deleteStudent).toHaveBeenCalledWith("8", expect.any(Function));
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ message: "Student deleted" });
    });

    it("returns 500 when model returns an error", () => {
      const req = { params: { id: "8" } };
      const res = createMockRes();
      const error = new Error("Database error");

      studentModel.deleteStudent.mockImplementation((id, cb) => cb(error));

      studentController.deleteStudent(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});
