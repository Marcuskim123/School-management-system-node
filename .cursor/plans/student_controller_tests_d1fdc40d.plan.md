---
name: Student Controller Tests
overview: Add Jest unit tests for all exported handlers in the student controller by mocking the model layer and Express response object behavior. Validate both success and error paths to prevent regressions in API responses.
todos:
  - id: add-controller-test-file
    content: Create studentController.test.js with mocked studentModel and reusable req/res test helpers
    status: completed
  - id: implement-handler-cases
    content: Add success and error unit tests for all six controller handlers
    status: completed
  - id: run-jest-suite
    content: Execute npm test and confirm controller tests pass
    status: completed
isProject: false
---

# Student Controller Unit Test Plan

## Goal
Create focused unit tests for `studentController` so each handler’s interaction with `studentModel` and HTTP responses is validated without hitting DB or routes.

## Scope
- Add a new controller test file: [`c:/Users/woore/Documents/2026-Mar-School-managment-school/controllers/studentController.test.js`](c:/Users/woore/Documents/2026-Mar-School-managment-school/controllers/studentController.test.js)
- Reuse current Jest setup from [`c:/Users/woore/Documents/2026-Mar-School-managment-school/package.json`](c:/Users/woore/Documents/2026-Mar-School-managment-school/package.json)
- Match existing test style used in [`c:/Users/woore/Documents/2026-Mar-School-managment-school/models/studentModel.test.js`](c:/Users/woore/Documents/2026-Mar-School-managment-school/models/studentModel.test.js)

## Test Design
- Mock `../models/studentModel` with `jest.fn()` for: `getAllStudents`, `getStudentById`, `createStudent`, `updateStudent`, `patchStudent`, `deleteStudent`.
- Build lightweight mock `res` object per test:
  - `status: jest.fn().mockReturnThis()`
  - `json: jest.fn()`
- Use plain `req` fixtures (`params`, `body`) per handler.
- For each controller export in [`c:/Users/woore/Documents/2026-Mar-School-managment-school/controllers/studentController.js`](c:/Users/woore/Documents/2026-Mar-School-managment-school/controllers/studentController.js), test:
  - success callback behavior (`res.json(...)` payload)
  - error callback behavior (`res.status(500).json(err)`)

## Cases To Cover
- `getStudents`
  - calls `studentModel.getAllStudents`
  - returns raw results on success
  - returns 500 with error on failure
- `getStudent`
  - passes `req.params.id` to model
  - returns results on success
  - returns 500 on failure
- `createStudent`
  - passes `req.body`
  - returns `{ message: "Student created", id: insertId }`
  - returns 500 on failure
- `updateStudent`
  - passes id and body
  - returns `{ message: "Student updated" }`
  - returns 500 on failure
- `patchStudent`
  - passes id and body
  - returns `{ message: "Student updated" }`
  - returns 500 on failure
- `deleteStudent`
  - passes id
  - returns `{ message: "Student deleted" }`
  - returns 500 on failure

## Verification
- Run `npm test` and confirm new controller tests pass with existing suite.
- If any flaky async behavior appears, normalize tests with callback-driven mock invocations and `jest.clearAllMocks()` after each test.