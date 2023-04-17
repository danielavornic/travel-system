export function shallowEquals(objA: any, objB: any): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export const removeDiactrics = (str: string) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const generatePaxStr = (nr: number): string => {
  const passengerString = "paxadult";
  const passengerArray = new Array(nr).fill(passengerString);
  return passengerArray.join("|");
};

export const generatePaxAgesStr = (nr: number): string => {
  if (nr <= 1) return "";
  const passengerAges = new Array(nr - 1).fill("|");
  return passengerAges.join("");
};
