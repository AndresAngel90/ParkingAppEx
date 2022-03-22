export const formatHour =(val:any)=>{
  const formatHour =new Date(val).toLocaleDateString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
  return formatHour
};