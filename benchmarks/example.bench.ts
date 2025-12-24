import { bench } from "vitest";

// Example benchmark for string operations
bench("String concatenation", () => {
  let result = "";
  for (let i = 0; i < 100; i++) {
    result += "test";
  }
});

// Example benchmark for array operations
bench("Array push operations", () => {
  const arr: number[] = [];
  for (let i = 0; i < 1000; i++) {
    arr.push(i);
  }
});

// Example benchmark for object creation
bench("Object creation", () => {
  const objects = [];
  for (let i = 0; i < 100; i++) {
    objects.push({ id: i, name: `Item ${i}`, value: Math.random() });
  }
});

// Example benchmark for parsing
bench("JSON parse and stringify", () => {
  const data = { users: Array.from({ length: 50 }, (_, i) => ({ id: i, name: `User${i}` })) };
  const str = JSON.stringify(data);
  JSON.parse(str);
});
