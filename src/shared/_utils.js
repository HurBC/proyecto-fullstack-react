export const formatCLP = (amount) => {
  if (amount == null || isNaN(amount)) return "--";
  const nf = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return nf.format(Math.round(amount));
}