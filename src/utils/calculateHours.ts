export const calculateHours=(date:string|Date)=>{
  const milliseconds = 1000;
  const seconds = 60;
  const minutes = 60
  const entryDate = new Date(date).getTime();
  const currentDate = new Date().getTime();
  const differenceMiliseconds = currentDate - entryDate;
  const quantityOfSeconds = differenceMiliseconds / milliseconds;
  const quantityOfMinutes = quantityOfSeconds / seconds;
  const quantityOfHour = Math.ceil(quantityOfMinutes / minutes);
  return quantityOfHour
}