let myArray = {
  0: 'first',
  1: 'second',
  2: 'third',
  length: 3 
};


for (let i = 0; i < myArray.length; i += 1) {
  console.log(myArray[i]);
}

// Create an array from the keys of the object obj below, with all of the keys converted to uppercase. Your implementation must not mutate obj

// let obj = {
//   b: 2,
//   a: 1,
//   c: 3,
// };

// let upperKeys = [];
// Object.keys(obj).forEach(key => {
//   upperKeys.push(key.toUpperCase());
//   return upperKeys;
// })

// console.log(upperKeys);
// console.log(obj);

// Create a new object named myObj that uses myProtoObj as its prototype.

let myProtoObj = {
  foo: 1,
  bar: 2,
};

let myObj = Object.create(myProtoObj);
myObj.qux = 3;

Object.keys(myObj).forEach(function(key) {
  console.log(key);
});

for (let key in myObj) {
  console.log(key);
}

// Create a function that creates and returns a copy of an object. The function should take two arguments: the object to copy and an array of the keys that you want to copy. Do not mutate the original object.

// The function should let you omit the array of keys argument when calling the function. If you do omit the argument, the function should copy all of the existing keys from the object.

let objToCopy = {
  foo: 1,
  bar: 2,
  qux: 3,
};

const copyObject = (obj, keys = Object.keys(obj)) => {
  let newObj = {};

  keys.forEach(key => {
    newObj[key] = obj[key];
  });

  return newObj;
}

console.log(copyObject(objToCopy));

// Write some code to replace the value 6 in the following object with 606:

let obj = {
  foo: { a: "hello", b: "world" },
  bar: ["example", "mem", null, { xyz: 6 }, 88],
  qux: [4, 8, 12]
};

obj.bar[3].xyz = 606;

console.log(obj);