export function shuffle<T>(array: Array<T>): Array<T> {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const to = Math.floor(Math.random() * (i + 1));
    const temp = newArray[i];
    newArray[i] = newArray[to];
    newArray[to] = temp;
  }

  return newArray;
}

export function takenFromEnd<T>(array: Array<T>, count: number): Array<T> {
  const takenElements: Array<T> = [];

  for (let i = count; i > 0 && array.length > 0; i--) {
    const e = array.pop();
    if (e) takenElements.unshift(e);
  }

  return takenElements;
}
