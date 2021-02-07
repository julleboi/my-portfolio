import * as contact from "../contact";
import { cleanTags, createMessage, handler } from "../contact";

describe("cleanTags(input)", () => {
  it("should not modify a valid string without HTML tags", () => {
    const clean = "This is a string without HTML tags";
    expect(cleanTags(clean)).toEqual(clean);
  });

  it("should correctly sanitize a string containing HTML tags", () => {
    const dirty = "<body>This <b>string</b> used to contain HTML<br />";
    expect(cleanTags(dirty)).toEqual("This string used to contain HTML");
  });
});

describe("createMessage(message)", () => {
  it("should output a message in the correct format", () => {
    const [name, email, message] = ["foo", "bar@baz.com", "Hello world!"];
    const createdMessage = createMessage(name, email, message);
    expect(createdMessage).toMatchInlineSnapshot(`
      "You have a new contact request from <b>foo</b>!

      <u>Message:</u>
      <pre>Hello world!</pre>

      Email: bar@baz.com"
    `);
  });
});

describe("middleware", () => {
  beforeAll(() => {
    const spy = jest.spyOn(contact, "sendNotification");
    spy.mockResolvedValue(true);
  });

  const event_base = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  it("should return status 200 for valid input", async () => {
    const event = { 
      ...event_base, 
      body: JSON.stringify({
        name: "foo",
        email: "bar@baz.com",
        message: "Hello world!"
      }
    )};
    expect(await (handler as any)(event))
      .toEqual(expect.objectContaining({ statusCode: 200 }));
  });

  it.each`
    input                                          | statusCode
    ${["foo", "", "Hello world!"]}                 | ${400}
    ${["foo", "foo@bar.böz", "Hello world!"]}      | ${400}
    ${["foo", "bar@baz.com", "...".repeat(1000)]}  | ${400}
    ${["...".repeat(100), "bar@baz.com", "Hello"]} | ${400}
  `(
    "should return status $statusCode for bad input",
    async ({ input, statusCode }) => {
      expect(
        await (handler as any)({
          ...event_base,
          body: JSON.stringify({
            name: input[0],
            email: input[1],
            message: input[2],
          }),
        })
      ).toEqual(expect.objectContaining({ statusCode }));
    }
  );
});
