const MarkovMachine = require("./markov");

describe("makeChains", function () {
  test("makeChains should return an object", function () {
    const markovMachine = new MarkovMachine("eggs.txt");
    const res = markovMachine.makeChains();
    expect(typeof res).toEqual("object");
  });
  test("makeChains should return correct chains", function () {
    const markovMachine = new MarkovMachine("the cat in the hat is in the hat");
    const expectedChains = {
      the: ["cat", "hat", "hat"],
      cat: ["in"],
      in: ["the", "the"],
      hat: ["is", null],
      is: ["in"],
    };
    const res = markovMachine.makeChains();
    expect(res).toEqual(expectedChains);
  });
});

describe("makeText", function () {
  test("makeText should return a string", function () {
    const markovMachine = new MarkovMachine("the cat in the hat is in the hat");
    const res = markovMachine.makeText();
    expect(typeof res).toEqual("string");
  });
  test("makeText should not return more words than limit", function () {
    const markovMachine = new MarkovMachine("the cat in the hat is in the hat");
    const text = markovMachine.makeText(3);
    let words = text.split(/[ \r\n]+/);
    words = words.filter((c) => c !== "");
    expect(words.length).toBeLessThanOrEqual(3);
  });
});
