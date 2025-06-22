
const arr = [10, 20, 30];

const result = arr.reduce((acc, cur, index, array) => {
  console.log(`Index: ${index}, Acc: ${acc}, Cur: ${cur}, Array: ${array}`);
  return acc+cur;
}, 0);

