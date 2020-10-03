# Ninja Name Generator

Generate Ninja names for given input words.

## Online Version

[Click Here](https://coding-challenge-shiran.herokuapp.com/) to open the Heroku version.

## Installation

Clone the repository, and run:

```sh
yarn install
yarn run build:prod
node server/server
```

And open `localhost:3000` to see the app running on your local machine.

### Documentation of the `NinjaName` class.

#### `constructor (items)`

This class will be initialized with the array of the input words and does the processing of the result.

After initialization, the `items` property will be appended to the class instance.

 * **Alias:** NinjaName
 * **Constructor**
 * **Parameters:** `items` — `Array` — The array of input buzz words.

#### `calculateWordScore (input)`

 * **Alias:** calculateWordScore
 * **Parameters:** `input` — `String` — The array of input buzz words.
 * **Returns:** `Number` — The word score (it's a float number between 97 to 122) -- it is the avarage of the ASCII codes of the word's latters.

#### `getNinjaWordForInput (input)`

 * **Alias:** getNinjaWordForInput
 * **Parameters:** `input` — `String` — The input buzzword.
 * **Returns:** `String` — The ninja word that was created.

#### `toName ()`

 * **Alias:** toName
 * **Returns:** `String` — The ninja name (one word for each buzz word, separated by spaces).

#### `toObjectName ()`

 * **Alias:** toObjectName
 * **Returns:** `Object` — An object having the `name` property, which is the ninja name.