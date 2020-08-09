// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const RemoveElementFromArray = (array: any[], comparation: (a: any) => unknown): any[] => {

  const newArray = [];

  array.forEach(value => {

    if (!comparation(value)) {

      newArray.push(value);
    }
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newArray;
};

export const MoveElementFromIndexFromArrayToPosition = (array: any[], indexOfElement: number, destinyPosition: number): any[] => {

  let newArray = array.slice(0, indexOfElement)
    .concat(array.slice(indexOfElement + 1));

  newArray = newArray.slice(0, destinyPosition)
    .concat([array[indexOfElement]])
    .concat(newArray.slice(destinyPosition));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return newArray;
};
