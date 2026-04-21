const studentModel = require('./studentModel');

// Mock the db module
jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

const db = require('../config/db');

describe('Student Model', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStudents', () => {
    it('should retrieve all students successfully', (done) => {
      const mockResults = [{ id: 1, name: 'John' }];
      db.query.mockImplementation((query, callback) => {
        callback(null, mockResults);
      });

      studentModel.getAllStudents((err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        expect(db.query).toHaveBeenCalledWith('SELECT * FROM student', expect.any(Function));
        done();
      });
    });

    it('should handle database error', (done) => {
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, callback) => {
        callback(mockError, null);
      });

      studentModel.getAllStudents((err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe('getStudentById', () => {
    it('should retrieve a student by id successfully', (done) => {
      const mockResults = [{ id: 1, name: 'John' }];
      const id = 1;
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockResults);
      });

      studentModel.getStudentById(id, (err, results) => {
        expect(err).toBeNull();
        expect(results).toEqual(mockResults);
        expect(db.query).toHaveBeenCalledWith('SELECT * FROM student WHERE student_id = ?', [id], expect.any(Function));
        done();
      });
    });

    it('should handle database error', (done) => {
      const mockError = new Error('Database error');
      const id = 1;
      db.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      studentModel.getStudentById(id, (err, results) => {
        expect(err).toEqual(mockError);
        expect(results).toBeNull();
        done();
      });
    });
  });

  describe('createStudent', () => {
    it('should create a student successfully', (done) => {
      const data = { first_name: 'John', last_name: 'Doe' };
      const mockResult = { insertId: 1 };
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      studentModel.createStudent(data, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(db.query).toHaveBeenCalledWith('INSERT INTO student SET ?', data, expect.any(Function));
        done();
      });
    });

    it('should handle database error', (done) => {
      const data = { first_name: 'John', last_name: 'Doe' };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      studentModel.createStudent(data, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('updateStudent', () => {
    it('should update a student successfully', (done) => {
      const id = 1;
      const data = { first_name: 'Jane' };
      const mockResult = { affectedRows: 1 };
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      studentModel.updateStudent(id, data, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(db.query).toHaveBeenCalledWith('UPDATE student SET ? WHERE student_id = ?', [data, id], expect.any(Function));
        done();
      });
    });

    it('should handle database error', (done) => {
      const id = 1;
      const data = { first_name: 'Jane' };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      studentModel.updateStudent(id, data, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('patchStudent', () => {
    it('should patch a student successfully', (done) => {
      const id = 1;
      const data = { first_name: 'Jane', last_name: undefined, email: undefined, phone: undefined };
      const mockResult = { affectedRows: 1 };
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      studentModel.patchStudent(id, data, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        // Verify that the query contains the expected UPDATE statement
        expect(db.query).toHaveBeenCalled();
        const callArgs = db.query.mock.calls[0];
        expect(callArgs[0]).toContain('UPDATE student');
        expect(callArgs[0]).toContain('COALESCE');
        expect(callArgs[1]).toEqual([data.first_name, data.last_name, data.email, data.phone, id]);
        done();
      });
    });

    it('should handle database error', (done) => {
      const id = 1;
      const data = { first_name: 'Jane' };
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      studentModel.patchStudent(id, data, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeNull();
        done();
      });
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student successfully', (done) => {
      const id = 1;
      const mockResult = { affectedRows: 1 };
      db.query.mockImplementation((query, params, callback) => {
        callback(null, mockResult);
      });

      studentModel.deleteStudent(id, (err, result) => {
        expect(err).toBeNull();
        expect(result).toEqual(mockResult);
        expect(db.query).toHaveBeenCalledWith('DELETE FROM student WHERE student_id = ?', [id], expect.any(Function));
        done();
      });
    });

    it('should handle database error', (done) => {
      const id = 1;
      const mockError = new Error('Database error');
      db.query.mockImplementation((query, params, callback) => {
        callback(mockError, null);
      });

      studentModel.deleteStudent(id, (err, result) => {
        expect(err).toEqual(mockError);
        expect(result).toBeNull();
        done();
      });
    });
  });
});