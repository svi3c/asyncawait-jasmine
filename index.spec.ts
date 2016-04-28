import {
  it,
  beforeEach,
  afterEach,
  beforeAll,
  afterAll,
  invert,
  await
} from "./index";

describe("async", () => {

  let running = false;
  let suiteRunning = false;

  beforeAll(() => new Promise(resolve => setTimeout(resolve)).then(() => suiteRunning = true));
  afterAll(() => new Promise(resolve => setTimeout(resolve)).then(() => suiteRunning = false));

  beforeEach(() => {
    expect(suiteRunning).toBe(true);
    await(new Promise(resolve => setTimeout(resolve)));
    running = true;
  });
  afterEach(() => expect(running).toBe(false));

  describe("it()", () => {

    beforeEach(() => {
      expect(running).toBe(true);
    });

    it("should wait for promise resolution", () => {
      await(new Promise(resolve => setTimeout(resolve)));
      running = false;
    });

    it("should work without promises", () => {
      running = false;
    });

  });

  describe("invert()", () => {

    it("should resolve an rejected promise", () => {
      let error = new Error("This error should become the resolution");

      let err = await(invert(new Promise((resolve, reject) => setTimeout(() => reject(error)))));
      expect(err).toBe(error);
      running = false;
    });

  });

});