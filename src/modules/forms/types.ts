
export type FieldType =
  | "section"
  | "text" | "textarea" | "number"
  | "select" | "radio" | "checkbox"
  | "date" | "email" | "phone"
  | "file";

export interface FormTheme {
  primary: string;       // e.g., "#DAA520"
  accent: string;        // e.g., "#000000"
  headerGradient?: { from: string; to: string };
  radius?: "sm" | "md" | "lg" | "2xl";
  spacing?: "compact" | "cozy" | "comfortable";
  fontHeading?: string;  // default "Playfair Display"
  fontBody?: string;     // default "Montserrat"
}

export interface FormField {
  id: string;            // uuid
  type: FieldType;
  label?: string;        // not required for "section"
  name?: string;         // machine name; unique in form when applicable
  required?: boolean;
  helpText?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string; sublabel?: string; priceNGN?: number; badge?: string }>;
  min?: number; max?: number;
}

export interface FormMeta {
  id: string;            // uuid
  name: string;          // REQUIRED
  slug: string;          // auto from name; unique
  description?: string;
  status: "draft" | "published" | "archived";
  createdAt: string; updatedAt: string;
  theme: FormTheme;
}

export interface FormSchema { 
  meta: FormMeta; 
  fields: FormField[]; 
}
