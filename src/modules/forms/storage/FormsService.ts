
import { FormSchema, FormMeta, FormField } from '../types';
import { slugify } from '../utils';

const KEY = 'vv_forms';

const DEFAULT_THEME = {
  primary: "#DAA520",
  accent: "#000000",
  headerGradient: { from: "#C89416", to: "#DAA520" },
  radius: "2xl" as const,
  spacing: "comfortable" as const,
  fontHeading: "Playfair Display",
  fontBody: "Montserrat",
};

function seedIfEmpty() {
  const raw = localStorage.getItem(KEY);
  if (raw) return;

  const now = new Date().toISOString();

  const orderForm: FormSchema = {
    meta: {
      id: crypto.randomUUID(),
      name: "Vitalvida Order Form (POD)",
      slug: "vitalvida-order-form",
      description: "Place your order – Only serious buyers should fill this form.",
      status: "draft",
      createdAt: now, 
      updatedAt: now,
      theme: DEFAULT_THEME,
    },
    fields: [
      { id: crypto.randomUUID(), type: "section", label: "Personal Information" },
      { id: crypto.randomUUID(), type: "text", label: "Full Name", name: "full_name", required: true, placeholder: "Enter your full name" },
      { id: crypto.randomUUID(), type: "phone", label: "Phone Number", name: "phone", required: true, helpText: "+234 by default" },
      { id: crypto.randomUUID(), type: "email", label: "Email Address (Optional)", name: "email", required: false },

      { id: crypto.randomUUID(), type: "section", label: "Location & Delivery" },
      { id: crypto.randomUUID(), type: "select", label: "State", name: "state", required: true,
        options: [
          { value: "lagos", label: "Lagos" }, 
          { value: "ogun", label: "Ogun" }, 
          { value: "oyo", label: "Oyo" },
          { value: "abuja", label: "Abuja (FCT)" }, 
          { value: "rivers", label: "Rivers" }
        ]},
      { id: crypto.randomUUID(), type: "textarea", label: "Delivery Address", name: "delivery_address", required: true, placeholder: "Enter your full delivery address" },

      { id: crypto.randomUUID(), type: "section", label: "Product Selection" },
      { id: crypto.randomUUID(), type: "radio", label: "Choose a Package", name: "package", required: true, options: [
        { value: "self-love-plus", label: "SELF LOVE PLUS", sublabel: "Buy 1 shampoo, 1 pomade, 1 conditioner", priceNGN: 32750 },
        { value: "self-love-b2g0f", label: "SELF LOVE B2G0F", sublabel: "Buy 2 shampoo, 2 pomade & Get 1 shampoo, 1 pomade FREE", priceNGN: 52750 },
        { value: "self-love-plus-b2g0f", label: "SELF LOVE PLUS B2G0F", sublabel: "Buy 2 shampoo, 2 pomade, 2 conditioners & Get 1 shampoo, 1 pomade, 1 conditioner", priceNGN: 66750 },
        { value: "self-love-return", label: "SELF LOVE RETURN", sublabel: "Buy 3 pomades", priceNGN: 32750 },
        { value: "single-pomade", label: "Buy 1 Pomade", priceNGN: 25000 },
        { value: "single-conditioner", label: "Buy 1 Conditioner", priceNGN: 25000 },
        { value: "family-saves", label: "FAMILY SAVES", sublabel: "Buy 6 of each; get 4 FREE of each", priceNGN: 215750 },
      ]},

      { id: crypto.randomUUID(), type: "text", label: "Promo Code (Optional)", name: "promo_code", required: false },
      { id: crypto.randomUUID(), type: "select", label: "How did you hear about us?", name: "ref_source", required: false,
        options: [
          { value: "facebook", label: "Facebook" }, 
          { value: "instagram", label: "Instagram" },
          { value: "friend", label: "Friend/Family" }, 
          { value: "google", label: "Google" }, 
          { value: "other", label: "Other" }
        ]},

      { id: crypto.randomUUID(), type: "section", label: "Delivery Options" },
      { id: crypto.randomUUID(), type: "radio", label: "Delivery Speed", name: "delivery_speed", required: true, options: [
        { value: "same-day", label: "Same-Day Delivery", sublabel: "Orders before 12 noon only", priceNGN: 4000 },
        { value: "express", label: "Express Delivery", sublabel: "1–2 days delivery", priceNGN: 3500 },
        { value: "standard", label: "Standard Delivery", sublabel: "3–5 days delivery", priceNGN: 2500 },
      ]},

      { id: crypto.randomUUID(), type: "section", label: "Payment Method" },
      { id: crypto.randomUUID(), type: "radio", label: "Choose Payment Method", name: "payment_method", required: true, options: [
        { value: "pod", label: "Pay on Delivery", badge: "Most Popular" },
        { value: "pbd", label: "Pay Before Delivery", badge: "Secure" },
      ]},
    ]
  };

  const emptyKYC: FormSchema = {
    meta: { 
      id: crypto.randomUUID(), 
      name: "KYC", 
      slug: "kyc", 
      description: "Base KYC form (start here).",
      status: "draft", 
      createdAt: now, 
      updatedAt: now, 
      theme: DEFAULT_THEME 
    },
    fields: [
      { id: crypto.randomUUID(), type: "section", label: "Identity" },
      { id: crypto.randomUUID(), type: "text", label: "Surname", name: "surname", required: true },
      { id: crypto.randomUUID(), type: "text", label: "First Name", name: "first_name", required: true },
      { id: crypto.randomUUID(), type: "date", label: "Date of Birth", name: "dob", required: true },
    ]
  };

  const academyIntake: FormSchema = {
    meta: { 
      id: crypto.randomUUID(), 
      name: "SystemForce Academy Intake", 
      slug: "systemforce-academy-intake",
      description: "Applicant intake form.", 
      status: "draft", 
      createdAt: now, 
      updatedAt: now, 
      theme: DEFAULT_THEME 
    },
    fields: [
      { id: crypto.randomUUID(), type: "section", label: "Applicant" },
      { id: crypto.randomUUID(), type: "text", label: "Full Name", name: "full_name", required: true },
      { id: crypto.randomUUID(), type: "email", label: "Email", name: "email" },
      { id: crypto.randomUUID(), type: "phone", label: "Phone", name: "phone", required: true },
    ]
  };

  localStorage.setItem(KEY, JSON.stringify([orderForm, emptyKYC, academyIntake]));
}

export interface FormsServiceInterface {
  list(): Promise<FormSchema[]>;
  get(id: string): Promise<FormSchema | null>;
  create(data: Partial<FormMeta>): Promise<FormSchema>;
  update(id: string, updates: Partial<FormSchema>): Promise<FormSchema>;
  remove(id: string): Promise<void>;
  duplicate(id: string): Promise<FormSchema>;
}

class LocalFormsService implements FormsServiceInterface {
  constructor() {
    seedIfEmpty();
  }

  async list(): Promise<FormSchema[]> {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async get(id: string): Promise<FormSchema | null> {
    const forms = await this.list();
    return forms.find(f => f.meta.id === id) || null;
  }

  async create(data: Partial<FormMeta>): Promise<FormSchema> {
    const forms = await this.list();
    const now = new Date().toISOString();
    const newForm: FormSchema = {
      meta: {
        id: crypto.randomUUID(),
        name: data.name || "Untitled Form",
        slug: slugify(data.name || "untitled-form"),
        description: data.description || "",
        status: "draft",
        createdAt: now,
        updatedAt: now,
        theme: DEFAULT_THEME,
        ...data
      },
      fields: []
    };
    
    forms.push(newForm);
    localStorage.setItem(KEY, JSON.stringify(forms));
    return newForm;
  }

  async update(id: string, updates: Partial<FormSchema>): Promise<FormSchema> {
    const forms = await this.list();
    const index = forms.findIndex(f => f.meta.id === id);
    if (index === -1) throw new Error('Form not found');
    
    const updated = {
      ...forms[index],
      ...updates,
      meta: {
        ...forms[index].meta,
        ...updates.meta,
        updatedAt: new Date().toISOString()
      }
    };
    
    forms[index] = updated;
    localStorage.setItem(KEY, JSON.stringify(forms));
    return updated;
  }

  async remove(id: string): Promise<void> {
    const forms = await this.list();
    const filtered = forms.filter(f => f.meta.id !== id);
    localStorage.setItem(KEY, JSON.stringify(filtered));
  }

  async duplicate(id: string): Promise<FormSchema> {
    const original = await this.get(id);
    if (!original) throw new Error('Form not found');
    
    return this.create({
      ...original.meta,
      name: `${original.meta.name} (Copy)`,
      slug: `${original.meta.slug}-copy`
    });
  }
}

class ApiFormsService implements FormsServiceInterface {
  async list(): Promise<FormSchema[]> {
    // TODO: implement API calls
    throw new Error('API service not implemented yet');
  }

  async get(id: string): Promise<FormSchema | null> {
    throw new Error('API service not implemented yet');
  }

  async create(data: Partial<FormMeta>): Promise<FormSchema> {
    throw new Error('API service not implemented yet');
  }

  async update(id: string, updates: Partial<FormSchema>): Promise<FormSchema> {
    throw new Error('API service not implemented yet');
  }

  async remove(id: string): Promise<void> {
    throw new Error('API service not implemented yet');
  }

  async duplicate(id: string): Promise<FormSchema> {
    throw new Error('API service not implemented yet');
  }
}

let useApiService = false;

export function getFormsService(): FormsServiceInterface {
  return useApiService ? new ApiFormsService() : new LocalFormsService();
}

export function toggleServiceMode(useApi: boolean) {
  useApiService = useApi;
}
