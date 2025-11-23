// Simple helper: CO2 saved = co2SavedPerUseKg * number of days (minimum 1)
const calcCO2 = (container, days) => {
  const perUse = container.co2SavedPerUseKg || 0.5;
  return perUse * Math.max(1, days);
};

export default calcCO2;
