// 1. Mathematical formulae
var sum_to_n_a = function (n) {
  // your code here
  return n*(n+1)/2
};

// 2. Using loops
var sum_to_n_b = function (n) {
  // your code here
  let sum = 0
  for(let i = 1; i <= n ; i++){
    sum += i
  }
  return sum
};

// 3. Recursion
var sum_to_n_c = function (n) {
  // your code here
  if(n === 1) return n
  return n + sum_to_n_c(n-1)
};
