import request from "supertest";
import { describe, test, beforeEach, afterEach, expect, vi } from "vitest";
import app from "../index.js"; 

// Mock the controller functions
vi.mock("../controllers/historyController.js", () => ({
  fetchHistory: vi.fn((req, res) => {
    res.status(200).json([{ id: 1, weight: 70, height: 1.7, bmi: 24.2 }]);
  }),
  createHistory: vi.fn((req, res) => {
    res.status(201).json({ message: "History saved" });
  }),
  removeHistory: vi.fn((req, res) => {
    res.status(200).json({ message: "History deleted" });
  }),
}));

describe("History Routes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("GET /api/history should return BMI history", async () => {
    const res = await request(app).get("/api/history");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([
      { id: 1, weight: 70, height: 1.7, bmi: 24.2 },
    ]);
  });

  test("POST /api/history should create a new BMI entry", async () => {
    const res = await request(app).post("/api/history").send({
      weight: 80,
      height: 1.8,
      bmi: 24.7,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("History saved");
  });

  test("DELETE /api/history/:id should delete an entry", async () => {
    const res = await request(app).delete("/api/history/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("History deleted");
  });
});
