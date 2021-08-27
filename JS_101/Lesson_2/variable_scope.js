// Rule 1: Outer scope variables can be accessed by the inner scope
// let outer = 1;

// const inner = () => {
//   console.log(outer); // Should console.log 1
//   outer += 1; // Should increment by 1 and reassign 2 to outer
// }

// inner(); // console.log 1
// console.log(outer); // console.log 2

// Rule 2: Inner scope variables can not be accessed from the outer scope

// const inner = () => {
//   let a = 1;
//   console.log(`I have access to the variable "a" now. It is ${a}`);
// }


// inner();
// console.log(a); // Should return a reference error

// Rule 3: 


let a = 1; // First level variable

const foo = () => { // Second level variable
    let b = 2;
    
    const bar = () => { // Third level variable
        let c = 3;
        console.log(a); // => 1
        console.log(b); // => 2
        console.log(c); // => 3
    }
    
    bar(); 
    console.log(a); // => 1
    console.log(b); // => 2
    console.log(c); // => ReferenceError
}

foo();