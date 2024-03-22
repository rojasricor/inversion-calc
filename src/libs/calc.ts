export const daily_interests = {
  "0Mto3M": 0.26,
  "3M1to5M": 2.6,
  "5M1to10M": 4.05,
  "10M1to20M": 7.05,
  "20M1to50M": 8.1,
  "+50M": 10.65,
};

export function calcInterestAccordingToCapital(capital: number) {
  switch (true) {
    case capital >= 0 && capital <= 3000000:
      return daily_interests["0Mto3M"];
    case capital > 3000000 && capital <= 5000000:
      return daily_interests["3M1to5M"];
    case capital > 5000000 && capital <= 10000000:
      return daily_interests["5M1to10M"];
    case capital > 10000000 && capital <= 20000000:
      return daily_interests["10M1to20M"];
    case capital > 20000000 && capital <= 50000000:
      return daily_interests["20M1to50M"];
    case capital > 50000000:
      return daily_interests["+50M"];
    default:
      return 0; // No se debería llegar aquí, pero por si acaso.
  }
}

export function calcCapitalIncrement(capital: number) {
  const interest = calcInterestAccordingToCapital(capital);
  return {
    value: (capital * interest) / 100,
    interest,
  };
}

export function calc(initial_capital: number, days: number) {
  const response = [];
  const cp = initial_capital;

  for (let i = 1; i <= days; i++) {
    const { value, interest } = calcCapitalIncrement(initial_capital);
    initial_capital += value;

    response.push({
      "Día No.": i,
      "Capital Final": `$${initial_capital.toFixed()}`,
      "Capital Incrementada": `$${value.toFixed()}`,
      Interes: `${interest}%`,
      Ganancia: `$${(initial_capital - cp).toFixed()}`,
    });
  }

  return response; // Devuelve un array de objetos con los datos de cada día.
}
