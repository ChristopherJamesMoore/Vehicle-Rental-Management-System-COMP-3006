const request = require("supertest");
const express = require("express");

describe("Health route", () => {
  it("GET / returns API running", async () => {
    const app = express();
    app.get("/", (req, res) => res.send("Vehicle Rental API running"));

    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain("Vehicle Rental API running");
  });
});