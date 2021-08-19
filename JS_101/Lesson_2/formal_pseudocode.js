// Given a collection of numbers.

// Iterate through the collection one by one.
//   - save the first value as the starting value.
//   - for each iteration, compare the saved value with the current value.
//   - if the current number is greater
//     - reassign the saved value as the current value
//   - otherwise, if the current value smaller or equal
//     - move to the next value in the collection

// After iterating through the collection, return the saved value.


// START

// # Given a collection of integers called "numbers"

// SET iterator = 1
// SET savedNumber = value within numbers collection at space 1

// WHILE iterator <= length of numbers
//   SET currentNumber = value within numbers collection at space "iterator"
//   IF currentNumber > savedNumber
//     savedNumber = currentNumber
//   ELSE
//     skip to the next iteration

//   iterator = iterator + 1

// PRINT savedNumber

// END


// let numArr = [2, 9, 7, 5, 145, 8, 89, 43];

// const findGreatest = numbers => {
//   if (numbers === undefined) return;
//   let savedNumber = numbers[0];
//   numbers.forEach( num => {
//     if (num > savedNumber) {
//       savedNumber = num;
//     }
//   });
//   return savedNumber;
// }

// console.log(findGreatest(numArr));


// For example, write out pseudocode (both casual and formal) that does the following:

// a function that returns the sum of two numbers
// Assign a variable1 to the the first number value
// Assign a variable2 to the the second number value
// Return the sum of variable1 and variable2

/*
START
  SET @param1 =  number1
  SET @param2 = number2

  READ number1 + number2
END
*/

// const sumOfTwoNumbers = (num1, num2) => num1 + num2;

// console.log(sumOfTwoNumbers(7, 21));

// a function that takes an array of strings, and returns a string that is all those strings concatenated together

/*
Given a collection of strings

  - Iterate through the collection one by one
  - create a variable that stores an empty string literal
  - For each iteration,
    - Add to the empty string the current string value in collection
  - After iterating through the collection, return new string value


  START
    SET strArr = array of strings
    SET newStr = empty string
    SET iterator = 0
    WHILE iterator <= strArr.length
      newStr += strArr[iterator]
      iterator += 1
    ELSE
      PRINT newStr
  END

*/

// const concatStrings = strArr => {
//   let newStr = '';
//   strArr.forEach(str => {
//     newStr += str;
//   });
//   return newStr;
// }

// console.log(concatStrings(['abcd', 'efg', 'hijk', 'lmno', 'pqrs', 'tuv', 'wxyz']));

// a function that takes an array of integers, and returns a new array with every other element

/*
Given a collection of Integers
  
  Create a new array to store every other integer in collection
  Iterate through the collection one by one
  If the values index in collection is an odd number
  Push the value onto new array
  Otherwise continue to next iteration
  After iterating through collection, return new array


START
  GET numArr
  SET newArr = empty array
  SET iterator = 0
  WHILE iterator <= numArr.length
    IF numArr[iterator] % 2 !== 0
      newArr.push(numArr[iterator])
    ELSE
      iterator += 1;
  PRINT newArr
END
  
*/

const oddNumElements = numArr => {
  let newArr = [];
  numArr.forEach(num => {
    if (num % 2 !== 0) {
      newArr.push(num);
    }
  });
  return newArr;
};

console.log(oddNumElements([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));




