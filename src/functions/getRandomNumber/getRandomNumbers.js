export default function getRandomNumbers(max) {
    let randomNumArr = []
    let step = 0;
    const min = 1;
    while (step <= 6) {
      max = Math.floor(max);
      const randomNumberx = Math.floor(Math.random() * (max - min)) + min;
      const index = randomNumArr.indexOf(randomNumberx);
      if (index === -1){
        randomNumArr.push(randomNumberx);
        step++;
      }
      if ( step === 6){
          return randomNumArr;
        }
      }
    }