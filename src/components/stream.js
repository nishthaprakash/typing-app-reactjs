const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export const randomeStreamGenerator = () => {
  
  let arr = [];
  while (arr.length < 20) {
    
    let num = Math.floor(Math.random() * 25);
    if (!arr.includes(alphabets[num])) {
      arr.push(alphabets[num]);
    }
  }
  return arr.join("");

};
