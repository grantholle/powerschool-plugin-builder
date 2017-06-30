var p1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'one');
});
var p2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'two');
});
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'three');
});
var p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'four');
});
var p5 = new Promise((resolve, reject) => {
  setTimeout(resolve, 1000, 'five');
});

Promise.all([p1, p2, p3, p4, p5]).then(values => {
  console.log(values);
}, reason => {
  console.log(reason)
});

// const a = [1, 2, 3, 4, 5],
//       show = (val) => {
//         console.log(val)
//       }
//
// a.forEach(val => {
//   show(val)
// })
//
// console.log('done')
