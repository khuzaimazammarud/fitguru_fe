export const getMealTime = () => {
    const currentHour = new Date().getHours();
  
    if (currentHour < 12) {
      return "breakfast";
    } else if (currentHour < 17) {
      return "lunch";
    } else {
      return "dinner";
    }
  };
  