// Filter the +12-length words
// After requiring the array of all the English words
// we keep only the words that are longer than 12 characters, assuming 
// they are more intersting for a ninja name 
const words = require("an-array-of-english-words").filter(c => c.length > 12)

// Profanity filter
// This will remove the bad words from the array of long words
const Filter = require('bad-words-plus')
const filter = new Filter();

// Remove the bad words
filter.removeWords(...words)

// Here we can configure an array of Easter
// eggs handled by the class.
// If any of the words that are in the request
// contain the specific word from the Easter eggs
// objects, then the response that will be returned
// will be the response that is associated with the
// Easter egg word (for example "konami").
const EASTER_EGGS = [
  {
    word: "konami",
    response: "進み続けてさえいれば、遅くとも関係ない。"
  },
  {
    word: "github",
    response: "Octocats are lovely!"
  },
  {
    word: "npm",
    response: "Nuclear Pizza Maker"
  }
]

// Ouput
// console.log(`English words: ${words.length}`)

class NinjaName {

    /**
     * This class will be initialized with the
     * array of the input words and does the processing
     * of the result.
     * 
     * After initialization, the `items` property will
     * be appended to the class instance.
     * 
     * @name NinjaName
     * @constructor
     * @description Initializes the `NinjaName` Class.
     * @param {Array} items The array of input buzz words.
     */
    constructor (items) {
        this.items = items
    }
    
    /**
     * @name calculateWordScore
     * @method
     * @description Accepts the input word, and calculates a score.
     * @param {String} input The array of input buzz words.
     * @returns {Number} The word score (it's a float number between 97 to 122) -- it is the avarage of the ASCII codes of the word's latters.
     */
    calculateWordScore (input) {

        // Later we work with lowercase letters,
        // so, let's make sure we have only lowercase
        // leters as input
        input = input.toLowerCase()

        // Variables used to calculate the average
        let sum = 0
        let length = 0

        // Iterate the characters of the input word (each letter from a-z)
        for (let i = 0; i < input.length; ++i) {
            // Get the ASCII code of the current letter
            const cCode = input.charCodeAt(i)

            // Validate the ASCII code to be between a and z
            // The range is: a: 97, z: 122
            // Ignore the characters that are not letters
            if (cCode >= 97 || cCode <= 122) {
                sum += cCode
                ++length
            }
        }

        // Calculate the average of the ASCII codes
        return sum / length
    }

    /**
     * @name getNinjaWordForInput
     * @method 
     * @description Handles the input word to proccess the ninja word.
     * @param {String} input The input buzzword.
     * @returns {String} The ninja word that was created.
     */
    getNinjaWordForInput (input) {

        // The score will be between 97 (a) and 122 (z)
        let score = this.calculateWordScore(input)

        // If the score is, then the initial projection will be:
        //  -          109                                   0.5
        //  -          97                                    0
        //  -          122                                   1


        // The range of letter score (a-z):       [97, ......*......., 122]
        // The range of word indexes:       [0,   ....................................    200k]
        //                           -------0-----------------------------------------------------> Infiniy

        // We calculate the propertional distance from
        // the start of the first range to the score
        // value, subtracting the start value (97),
        // because the goal is to project the value
        // in the second range at the same proportional
        // distance, like in the first range (but
        // starting with 0). The projection value
        // will be between [0, 1].
        // 
        // e.g. for "a", the projection will be 0,
        //      for "z", 1
        let initialProjection = (score - 97) / (122 - 97)

        // If the range is: 200000
        //  - 109 --> 0.5 ---> 100000
        //  - 96  --> 0   ---> 0
        //  - 122  --> 1  ---> 199999

        // Calculate the final projection as integer, becasue this will be
        // the index of the English words array, so, we cannot have
        // real numbers (with decimals), but only integers.
        const finalRangeValue = initialProjection * words.length

        // For the sake of having a good Ninja name, which is not guessable,
        // multiply the range value by the length of the letters of the items,
        // producing a new value in the range, which is unexpectable, making
        // the ninja name not guessable.
        // 
        // Finally, round the value to an integer, because this will represent
        // the index.
        let finalProjection = Math.round(finalRangeValue * this.items.join("").length / 50)
        
        // If the index is outside of the range (of the english words array),
        // due to the above multiplication, make the index to be the last one
        // (the last word from the array.)
        if (finalProjection >= words.length) {
            finalProjection = words.length - 1
        }

        return words[finalProjection]
    }

    /**
     * @name toName
     * @method
     * @description Handles the easter eggs and processes the ninja words for the input buzz words.
     * @returns {String} The ninja name (one word for each buzz word, separated by spaces).
     */
    toName () {

      // First of all, handle the Easter eggs.
      for (let egg of EASTER_EGGS) {
        // If the words include one of the Easter eggs'
        // words, return the response associated with it.
        if (this.items.includes(egg.word)) {
          return egg.response
        }
      }
        
      // If there is no Easter egg found, we go forward for
      // the normal handling of the words.
      // Iterate the words, get the ninja name
      // for each one of them (as string) and
      // join the array of ninja names with spaces
      // to have a String return value. 
      return this.items.map(
        currentItem => this.getNinjaWordForInput(currentItem)
      ).join(" ")
    }

    /**
     * @name toObjectName
     * @method
     * @description Processes the input words and returns the name wrapped into an object.
     * @returns {Object} An object having the `name` property, which is the ninja name.
     */
    toObjectName () {
        return {
            name: this.toName()
        }
    }
}

module.exports = NinjaName;