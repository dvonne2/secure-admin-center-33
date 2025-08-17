
export const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

export const uniqueName = (base: string, existing: string[]) => { 
  let n = slugify(base).replace(/-/g, "_");
  let i = 1; 
  while (existing.includes(n)) n = `${n}_${i++}`; 
  return n; 
};

export const fmtNGN = (n: number) => new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0
}).format(n);
