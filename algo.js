
// Profanity filter
const Filter = require('bad-words-plus')
const filter = new Filter();

// Filter the +12-length words
const words = require("an-array-of-english-words").filter(c => c.length > 12)

// Remove the bad words
filter.removeWords(...words)

// Ouput
console.log(`English words: ${words.length}`)

class NinjaName {

    constructor (items) {
        this.items = items
    }

    calculateWordScore (input) {
        input = input.toLowerCase()

        let sum = 0
        let length = 0

        for (let i = 0; i < input.length; ++i) {
            const cCode = input.charCodeAt(i)
            if (cCode >= 97 || cCode <= 122) {
                sum += cCode
                ++length
            }
        }

        // Calculate the average of the ASCII codes
        return sum / length
    }
    // my-funny-app.herokuapp.com/ninjify?x=nodejs,rails,sass
    // req.query.x

    getNinjaWordForInput (input) {
        // The score will be between 97 (a) and 122 (z)
        let score = this.calculateWordScore(input)
        // If the score is, then the initial projection will be:
        //  -          109                                   0.5
        //  -          97                                    0
        //  -          122                                   1

        let initialProjection = (score - 97) / (122 - 97)

        // If the range is: 200000
        //  - 109 --> 0.5 ---> 100000
        //  - 96  --> 0   ---> 0
        //  - 122  --> 1  ---> 199999
        let finalProjection = Math.round(initialProjection * words.length * this.items.join("").length / 50)


        if (finalProjection >= words.length) {
            finalProjection = words.length - 1
        }

        return words[finalProjection]
    }
    toName () {
        return this.items.map(c => this.getNinjaWordForInput(c)).join(" ")
    }
    toObjectName () {
        return {
            name: this.toName()
        }
    }
}

const result = new NinjaName([
    "I", "Love", "NodeJS"
]).toObjectName()

console.log(result);