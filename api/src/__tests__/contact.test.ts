import { cleanTags, createMessage } from "../contact";

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
