import request from "supertest";

import {
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { app } from "../src/app.js";
import { prisma } from "../src/config/database.js";

describe("Lead API", () => {
  beforeEach(async () => {
    await prisma.lead.deleteMany();
  });

  afterAll(async () => {
    await prisma.lead.deleteMany();
    await prisma.$disconnect();
  });

  describe("GET /leads", () => {
    it("returns an empty array when no leads exist", async () => {
      const response = await request(app)
        .get("/leads")
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: [],
      });
    });

    it("returns existing leads", async () => {
      await request(app)
        .post("/leads")
        .send({
          name: "Jane Doe",
          email: "jane@example.com",
          status: "New",
        })
        .expect(201);

      const response = await request(app)
        .get("/leads")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);

      expect(response.body.data[0]).toMatchObject({
        name: "Jane Doe",
        email: "jane@example.com",
        status: "New",
      });
    });
  });

  describe("POST /leads", () => {
    it("creates a lead successfully", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          name: "John Doe",
          email: "john@example.com",
          status: "New",
        })
        .expect(201);

      expect(response.body.success).toBe(true);

      expect(response.body.message).toBe(
        "Lead created successfully",
      );

      expect(response.body.data).toMatchObject({
        name: "John Doe",
        email: "john@example.com",
        status: "New",
      });
    });

    it("rejects missing name", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          email: "missing@example.com",
          status: "New",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Validation failed",
      );
    });

    it("rejects invalid email", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          name: "Invalid Email",
          email: "wrong-email",
          status: "New",
        })
        .expect(400);

      expect(response.body.errors.email).toBe(
        "Invalid email address",
      );
    });

    it("rejects invalid status", async () => {
      const response = await request(app)
        .post("/leads")
        .send({
          name: "Wrong Status",
          email: "wrong-status@example.com",
          status: "Pending",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("rejects duplicate emails", async () => {
      await request(app)
        .post("/leads")
        .send({
          name: "First Lead",
          email: "duplicate@example.com",
          status: "New",
        })
        .expect(201);

      const response = await request(app)
        .post("/leads")
        .send({
          name: "Second Lead",
          email: "duplicate@example.com",
          status: "Engaged",
        })
        .expect(409);

      expect(response.body.code).toBe(
        "DUPLICATE_EMAIL",
      );
    });
  });
});
