export const calculateCO2Savings = (containerType, rentDays) => {
  const co2PerContainer = {
    plastic: 2.5,
    glass: 1.8,
    metal: 3.2,
    mixed: 2.5,
  };

  const baseSavings = co2PerContainer[containerType] || 2.5;
  const totalSavings = baseSavings * rentDays;

  return Math.round(totalSavings * 100) / 100;
};

export const calculateEcoScore = (totalCO2Saved) => {
  const scorePerKg = 1;
  let score = Math.floor(totalCO2Saved * scorePerKg);
  score = Math.min(score, 1000);
  return score;
};
