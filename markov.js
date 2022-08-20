/** Textual markov chain generator */

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};
    let prevWord = "";
    for (let i = 0; i < this.words.length; i++) {
      if (i == 0) {
        chains[this.words[i]] = [];
        prevWord = this.words[i];
      } else if (i == this.words.length - 1) {
        if (prevWord in chains) {
          chains[prevWord].push(this.words[i]);
        } else {
          chains[prevWord] = [this.words[i]];
        }
        if (this.words[i] in chains) {
          chains[this.words[i]].push(null);
        } else {
          chains[this.words[i]] = [null];
        }
      } else {
        if (prevWord in chains) {
          chains[prevWord].push(this.words[i]);
        } else {
          chains[prevWord] = [this.words[i]];
        }
        prevWord = this.words[i];
      }
    }
    return chains;
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    const chains = this.makeChains();
    let text =
      Object.keys(chains)[
        Math.floor(Math.random() * Object.keys(chains).length)
      ];
    let currWord = text;
    for (let i = 1; i < numWords; i++) {
      let nextWord =
        chains[currWord][Math.floor(Math.random() * chains[currWord].length)];
      if (nextWord != null) {
        text += ` ${nextWord}`;
        currWord = nextWord;
      } else {
        break;
      }
    }
    return text;
  }
}

module.exports = MarkovMachine;
