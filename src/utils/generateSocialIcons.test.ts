import generateSocialIcons from "./generateSocialIcons";

test("all yellow colors", () => {
  const state = ["labas", "albas", "labas", "albas", "labas", "albas"];
  const result = generateSocialIcons(state, "bsala");

  const expected = [
    "ð¨ð¨ð¨ð¨ð¨",
    "ð¨ð¨ð¨ð¨ð¨",
    "ð¨ð¨ð¨ð¨ð¨",
    "ð¨ð¨ð¨ð¨ð¨",
    "ð¨ð¨ð¨ð¨ð¨",
    "ð¨ð¨ð¨ð¨ð¨",
  ];

  expect(result).toEqual(expected);
});

test("all gray colors", () => {
  const state = ["prÅ«Å¾Ä", "Å¾Å«ÄÄ¯c", "prÅ«Å¾Ä", "Å¾Å«ÄÄ¯c", "prÅ«Å¾Ä", "prÅ«Å¾Ä"];
  const result = generateSocialIcons(state, "bsala");

  const expected = [
    "â¬â¬â¬â¬â¬",
    "â¬â¬â¬â¬â¬",
    "â¬â¬â¬â¬â¬",
    "â¬â¬â¬â¬â¬",
    "â¬â¬â¬â¬â¬",
    "â¬â¬â¬â¬â¬",
  ];

  expect(result).toEqual(expected);
});

test("all green colors", () => {
  const state = ["prÅ«Å¾Ä", "prÅ«Å¾Ä", "prÅ«Å¾Ä", "prÅ«Å¾Ä", "prÅ«Å¾Ä", "prÅ«Å¾Ä"];
  const result = generateSocialIcons(state, "prÅ«Å¾Ä");

  const expected = [
    "ð©ð©ð©ð©ð©",
    "ð©ð©ð©ð©ð©",
    "ð©ð©ð©ð©ð©",
    "ð©ð©ð©ð©ð©",
    "ð©ð©ð©ð©ð©",
    "ð©ð©ð©ð©ð©",
  ];

  expect(result).toEqual(expected);
});

test("mixed colors", () => {
  const state = ["labas", "malka", "Å¾adÄk", "puvÄs", "grieÅ¡", "bambt"];
  const result = generateSocialIcons(state, "namas");

  const expected = [
    "â¬ð©â¬ð©ð©",
    "ð¨ð©â¬â¬ð¨",
    "â¬ð©â¬â¬â¬",
    "â¬â¬â¬â¬ð©",
    "â¬â¬â¬â¬â¬",
    "â¬ð©ð©â¬â¬",
  ];

  expect(result).toEqual(expected);
});

test("only 3 rows", () => {
  const state = ["labas", "malka", "Å¾adÄk", "namas"];
  const result = generateSocialIcons(state, "namas");

  const expected = ["â¬ð©â¬ð©ð©", "ð¨ð©â¬â¬ð¨", "â¬ð©â¬â¬â¬", "ð©ð©ð©ð©ð©"];

  expect(result).toEqual(expected);
});
