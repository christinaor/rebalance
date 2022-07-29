/*
describe - Jest method for containing one or more tests, for a suite of tests
takes 2 args - a str describing test suite, callback func for wrapping actual test
test - actual test block
testing is a matter of inputs, funcs, and expected outputs ***
expect - takes in the function being invoked, with the toEqual method checking output of that function
In a real project, you would define the function in another file and import it from the test file.

Jest has built-in code coverage, activated in 2 ways:
1 - via command line by passing --coverage flag
2 - configuring Jest in package.json
Helps uncover blind spots of paths our code can take
Keep code coverage by actively configuring Jest in package.json:
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "collectCoverage": true
  },

Can also have HTML report for code coverage:
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "collectCoverage": true,
    "coverageReporters": ["html"]
  },
Now "npm test" will access "coverage" in project folder
*/

//Example: testing - filterByTerm(inputArr, "link");
// function filterByTerm(inputArr, searchTerm) {
//   if (searchTerm === "") return [];
//   const regex = new RegExp(searchTerm, "i"); // i for insensitive in regex
//   return inputArr.filter(function(arrayElement) {
//     return arrayElement.url.match(regex);
//   });
// }

const filterByTerm = require("../src/filterByTerm")

describe("Filter function", () => {
  test("it should filter by a search term (link)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [{ id: 3, url: "https://www.link3.dev" }];

    expect(filterByTerm(input, "link")).toEqual(output);
    expect(filterByTerm(input, "LINK")).toEqual(output);
  });

  test("it should filter by a search term (uRl)", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    const output = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" }
    ];

    expect(filterByTerm(input, "uRl")).toEqual(output);
  });

  test("it should throw when searchTerm is empty string", () => {
    const input = [
      { id: 1, url: "https://www.url1.dev" },
      { id: 2, url: "https://www.url2.dev" },
      { id: 3, url: "https://www.link3.dev" }
    ];

    // MUST wrap code in a function, else error will not be caught and assertion will fail
    expect(() => {
      filterByTerm(input, "");
    }).toThrow();
  });

  test('it should throw when inputArr is empty', () => {
    const input = [];
    expect(() => {
      filterByTerm(input, "link");
    }).toThrow();
  });
  
});
