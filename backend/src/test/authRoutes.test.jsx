// import request from "supertest";

// import { test, describe, beforeEach, afterEach, expect, vi } from "vitest";



// vi.mock("../models/userModel.js", () => {
//   return {
//     createUser: vi.fn(),
//     findUserByEmail: vi.fn(),
//   };
// });

// vi.mock("jsonwebtoken", () => ({
//   sign: vi.fn(() => "mocked-jwt-token"),
// }));

// import { createUser, findUserByEmail } from "../models/userModel.js";
// import bcrypt, { compare } from "bcryptjs";
// import app from "../index.js";

// vi.mock("bcryptjs", () => ({
//   compare: vi.fn(),
// }));

// describe("Auth Routes", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   describe("POST /api/auth/signup", () => {
//     test("should register a new user", async () => {
//       findUserByEmail.mockResolvedValue(null); // email not in use
//       createUser.mockResolvedValue({ id: 1 });

//       const res = await request(app).post("/api/auth/signup").send({
//         name: "Gourab",
//         email: "gourab@gmail.com",
//         password: "asd123",
//       });

//       expect(res.statusCode).toBe(201);
//       expect(res.body.message).toBe("User registered successfully");
//     });

//     test("user already exists", async () => {
//       findUserByEmail.mockResolvedValue({ id: 1, email: "gourab@gmail.com" });

//       const res = await request(app).post("/api/auth/signup").send({
//         name: "Gourab",
//         email: "gourab@gmail.com",
//         password: "asd123",
//       });

//       expect(res.statusCode).toBe(400);
//       expect(res.body.message).toBe("Email already exists");
//     });
//   });

  
  

//   describe("POST /api/auth/login", () => {
//     test("correct credentials", async () => {
//       const mockUser = {
//         id: 1,
//         name: "Gourab",
//         email: "gourab@gmail.com",
//         password: "asd123",
//       };
//       findUserByEmail.mockResolvedValue(mockUser);
//       compare.mockResolvedValue(true);

//       const res = await request(app).post("/api/auth/login").send({
//         email: "gourab@gmail.com",
//         password: "asd123",
//       });

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("token");
//       expect(res.body.user.email).toBe("gourab@gmail.com");
//     });
//   });
// });

import request from 'supertest';
import { describe, expect, it, vi } from 'vitest'; 
import app from "../index.js"; 
import { createUser, findUserByEmail } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


vi.mock('../models/userModel');
vi.mock('bcryptjs');
vi.mock('jsonwebtoken');

// Signup Test
describe('POST /signup', () => {
  it('should return 201 for successful signup', async () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    findUserByEmail.mockResolvedValue(null); 
    createUser.mockResolvedValue(mockUser); 

    const response = await request(app)
      .post('/api/auth/signup')
      .send(mockUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
  });

  it('should return 400 if email already exists', async () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    findUserByEmail.mockResolvedValue(mockUser);
    const response = await request(app)
      .post('/api/auth/signup')
      .send(mockUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('should return 500 on server error', async () => {
    const mockUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    findUserByEmail.mockRejectedValue(new Error('DB error')); 

    const response = await request(app)
      .post('/api/auth/signup')
      .send(mockUser);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error creating user');
  });
});

// Login Test
describe('POST /login', () => {
  it('should return 200 for successful login', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10), 
    };

    findUserByEmail.mockResolvedValue(mockUser); 
    bcrypt.compare.mockResolvedValue(true); 
    jwt.sign.mockReturnValue('fake-jwt-token'); 

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: mockUser.email, password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBe('fake-jwt-token');
    expect(response.body.user.id).toBe(mockUser.id);
  });

  it('should return 400 for invalid email or password', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    };

    findUserByEmail.mockResolvedValue(mockUser); 
    bcrypt.compare.mockResolvedValue(false); 

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: mockUser.email, password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });

  it('should return 500 on server error', async () => {
    const mockUser = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };

    findUserByEmail.mockRejectedValue(new Error('DB error'));

    const response = await request(app)
      .post('/api/auth/login')
      .send(mockUser);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error logging in');
  });
});
