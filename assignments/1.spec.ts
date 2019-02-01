import { empty } from "ramda";

/**
 * Fix the unit tests by only changing the Ramda const.
 * const Ramda = ...
 *
 * You can use all functions available inside the test except for ES6.
 */
describe("Ramda methods", () => {
  let Ramda;
  let ES6;
  let output;

  afterEach(() => {
    expect(ES6).toEqual(output);
    expect(Ramda).toEqual(output);
  });

  it("Assignment 1", () => {
    /**
     * Create a map fn that uses addNumberToString.
     * https://ramdajs.com/docs/#addIndex
     *
     * Hint: Ramda map doesn't have an index param out of the box.
     */
    const input = ["a", "b", "c", "d"];
    output = ["0.a", "1.b", "2.c", "3.d"];

    const prefixStringWithIndex = (s: string, index: number) => `${index}.${s}`;

    Ramda = empty(input);

    /**
     * ES6
     */
    ES6 = ((input: string[]) => input.map(prefixStringWithIndex))(input);
  });

  it("Assignment 2", () => {
    /**
     * 1. Create a `reduce` fn that uses combineArrays.
     * https://ramdajs.com/docs/#reduce
     *
     * 2. Replace that fn with `flatten`
     * https://ramdajs.com/docs/#flatten
     *
     */
    const input = [["a", "b"], ["c", "d"]];
    output = ["a", "b", "c", "d"];

    const combineArrays = (acc: string[], value: string[]) => [...acc, ...value];

    Ramda = empty(input);

    /**
     * ES6
     */
    ES6 = ((input: string[][]) => input.reduce(combineArrays, []))(input);
  });

  it("Assignment 3", () => {
    /**
     * Use `pipe` to call the previously implemented Ramda fns.
     *
     * Hint: `pipe` executes from top to bottom, the opposite of `compose`
     */
    const input = [["a", "b"], ["c", "d"]];
    output = ["0.a", "1.b", "2.c", "3.d"];

    const prefixStringWithIndex = (s: string, index: number) => `${index}.${s}`;

    Ramda = empty(input);

    /**
     * ES6
     */
    ES6 = ((input: string[][]) =>
      input.reduce((acc, value) => [...acc, ...value], []).map(prefixStringWithIndex))(input);
  });

  it("Assignment 4", () => {
    /**
     * Use `curry` to create a fn that has the first param pre-filled.
     * https://ramdajs.com/docs/#curry
     */
    const input = 1;
    output = "1.Test";

    const prefixStringWithIndex = (s: string, index: number) => `${index}.${s}`;

    Ramda = empty(input);

    /**
     * ES6
     */
    ES6 = ((s: string) => (index: number) => prefixStringWithIndex(s, index))("Test")(input);
  });

  it("Assignment 5", () => {
    /**
     * Use `curry` to create a fn that has the last param pre-filled.
     * https://ramdajs.com/docs/#curry
     * https://ramdajs.com/docs/#flip
     */
    const input = "Test";
    output = "1.Test";

    const prefixStringWithIndex = (s: string, index: number) => `${index}.${s}`;

    Ramda = empty(input);

    /**
     * ES6
     */
    ES6 = ((index: number) => (s: string) => prefixStringWithIndex(s, index))(1)(input);
  });

  it("Assignment 6", () => {
    /**
     * Use `converge` to create a fn that applies all mappers and pushes the result to mergeAll.
     * https://ramdajs.com/docs/#converge
     * https://ramdajs.com/docs/#mergeAll
     *
     * Hint: converge gets all arguments separately, so you'll need to collect them and pass them
     * to mergeAll as a list. (...results) => ...
     */
    const input = 1;
    output = {
      original: 1,
      times2: 2,
      plus10: 11
    };

    const mappers = [
      (n: number) => ({ original: n }),
      (n: number) => ({ times2: n * 2 }),
      (n: number) => ({ plus10: n + 10 })
    ];

    Ramda = empty(input);

    /**
     * ES6
     */
    const mergeMapperResultsToObj = (mappers: ((n: number) => {})[], value: number) => {
      return mappers.map(m => m(value)).reduce((acc, result) => ({ ...acc, ...result }));
    };

    ES6 = mergeMapperResultsToObj(mappers, input);
  });

  it("Assignment 7", () => {
    /**
     * Use `pipe` or `compose` to pass options to fetchState so that the whole chain doesn't have knowledge of the passed options.
     * The goal is to create a layered structure that is not hardcoded with options like `locale`
     * https://ramdajs.com/docs/#pipe
     * https://ramdajs.com/docs/#compose
     *
     * Hint: Instead of passing a locale, pass a compose/pipe that gets executed in fetchState.
     */
    const input = "de_AT";
    output = {
      locale: "de_AT"
    };

    const requestHandler = (locale: string) => {
      const fn = empty;
      return getState(fn);
    };

    const getState = fn => {
      //...
      return fetchState(fn);
    };

    const fetchState = fn => {
      //...
      return fn({});
    };

    Ramda = requestHandler(input);

    /**
     * ES6
     */
    const requestHandlerES6 = (locale: string) => {
      return getStateES6(locale);
    };

    const getStateES6 = (locale: string) => {
      //...
      return fetchStateES6(locale);
    };

    const fetchStateES6 = (locale: string) => {
      //...
      return { locale };
    };

    ES6 = requestHandlerES6(input);
  });
});
