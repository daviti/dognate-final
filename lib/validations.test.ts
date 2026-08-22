import { describe, expect, it } from "vitest";
import {
  addressSchema,
  registerSchema,
  supplySchema,
  wishlistItemSchema,
} from "./validations";

describe("registerSchema", () => {
  const base = {
    email: "test@example.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    phoneNumber: "5551234567",
  };

  it("accepts valid input", () => {
    expect(registerSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a phone number that isn't exactly 10 digits", () => {
    expect(registerSchema.safeParse({ ...base, phoneNumber: "555123456" }).success).toBe(
      false,
    );
    expect(
      registerSchema.safeParse({ ...base, phoneNumber: "55512345678" }).success,
    ).toBe(false);
  });

  it("rejects a phone number with non-digit characters", () => {
    expect(
      registerSchema.safeParse({ ...base, phoneNumber: "555-123-4567" }).success,
    ).toBe(false);
  });

  it("rejects an invalid email", () => {
    expect(registerSchema.safeParse({ ...base, email: "not-an-email" }).success).toBe(
      false,
    );
  });

  it("rejects a password shorter than 8 characters", () => {
    expect(registerSchema.safeParse({ ...base, password: "short" }).success).toBe(
      false,
    );
  });

  it("rejects a password longer than 72 characters", () => {
    expect(
      registerSchema.safeParse({ ...base, password: "a".repeat(73) }).success,
    ).toBe(false);
  });

  it("rejects a first name longer than 100 characters", () => {
    expect(
      registerSchema.safeParse({ ...base, firstName: "a".repeat(101) }).success,
    ).toBe(false);
  });
});

describe("addressSchema", () => {
  const base = { city: "Springfield", state: "IL", zipcode: "62704" };

  it("accepts valid input", () => {
    expect(addressSchema.safeParse(base).success).toBe(true);
  });

  it("rejects a zipcode that isn't exactly 5 digits", () => {
    expect(addressSchema.safeParse({ ...base, zipcode: "6270" }).success).toBe(false);
    expect(addressSchema.safeParse({ ...base, zipcode: "627045" }).success).toBe(
      false,
    );
  });
});

describe("supplySchema", () => {
  const base = {
    name: "Fence posts",
    description: "10 wooden posts",
    condition: "used",
    categoryId: "abc123",
    quantity: "10",
  };

  it("accepts valid input", () => {
    expect(supplySchema.safeParse(base).success).toBe(true);
  });

  it("rejects quantity below 1", () => {
    expect(supplySchema.safeParse({ ...base, quantity: "0" }).success).toBe(false);
  });

  it("rejects quantity above 100", () => {
    expect(supplySchema.safeParse({ ...base, quantity: "101" }).success).toBe(false);
  });

  it("accepts the boundary values 1 and 100", () => {
    expect(supplySchema.safeParse({ ...base, quantity: "1" }).success).toBe(true);
    expect(supplySchema.safeParse({ ...base, quantity: "100" }).success).toBe(true);
  });
});

describe("wishlistItemSchema", () => {
  it("accepts valid input without a photo", () => {
    expect(
      wishlistItemSchema.safeParse({
        title: "Bag of feed",
        description: "For the hens",
        photoUrl: "",
      }).success,
    ).toBe(true);
  });

  it("rejects a missing title", () => {
    expect(
      wishlistItemSchema.safeParse({ title: "", description: "Needed" }).success,
    ).toBe(false);
  });

  it("rejects a description longer than 2000 characters", () => {
    expect(
      wishlistItemSchema.safeParse({
        title: "Bag of feed",
        description: "a".repeat(2001),
      }).success,
    ).toBe(false);
  });
});
