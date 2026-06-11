import { SITE } from "./site";

/**
 * Pre-treatment consultation (intake) forms — the dynamic step of the booking
 * flow. Four treatment groups carry a full questionnaire (facials, the carbon
 * laser facial, lash extensions, body sugaring); every other service shows a
 * short general disclosure instead. The booking API re-validates submitted
 * answers against these same definitions, so a required question can never be
 * skipped client-side.
 *
 * Question sets were rebuilt from the client's paper consultation forms
 * (`Form References/`) with the wording rewritten for Harav's voice. Signature,
 * date and technician fields from the paper forms are intentionally dropped —
 * consent is a single required checkbox (`CONSENT_STATEMENT`).
 */

export type IntakeFormId =
  | "facial"
  | "carbon-laser"
  | "lash-extensions"
  | "sugaring"
  | "general";

/** field id → answer. Radio/select/text answers are strings; checkboxes are arrays. */
export type IntakeAnswers = Record<string, string | string[]>;

interface IntakeFieldBase {
  id: string;
  label: string;
  /** Small helper line under the label. */
  help?: string;
  /** Render (and validate) only when another field's answer matches. */
  showIf?: { field: string; equals?: string; includes?: string };
}

export type IntakeField =
  | (IntakeFieldBase & { kind: "radio"; options: readonly string[] })
  | (IntakeFieldBase & { kind: "select"; options: readonly string[] })
  | (IntakeFieldBase & {
      kind: "checkboxes";
      options: readonly string[];
      /** Option that clears the rest when ticked (e.g. "None of these apply to me"). */
      exclusiveOption?: string;
    })
  | (IntakeFieldBase & { kind: "text" | "textarea"; placeholder?: string; maxLength?: number });

export interface IntakeSection {
  title: string;
  description?: string;
  fields: IntakeField[];
}

export interface IntakeForm {
  id: IntakeFormId;
  title: string;
  intro: string;
  sections: IntakeSection[];
  /** Shown in the consent panel directly above the consent checkbox. */
  acknowledgements: string[];
}

export const YES_NO = ["Yes", "No"] as const;

export const AGE_FIELD_ID = "age18";

export const UNDER_18_MESSAGE = `Online booking is available to guests 18 and over. Please call us at ${SITE.phone} and we'll be happy to arrange your appointment.`;

export const CONSENT_STATEMENT =
  "I confirm that the information I have provided is true, accurate and complete to the best of my knowledge, and that I have read and understood the acknowledgements above. I consent to receive my selected treatment from Harav Salon & Spa, and I will promptly inform my technician if any of this information changes.";

export const CANCELLATION_NOTE = `Plans change — we understand. Please give us at least 24 hours' notice for cancellations or changes by calling ${SITE.phone} or emailing ${SITE.email}, so we can offer the time to another guest. Booking deposits are non-refundable.`;

const ageField: IntakeField = {
  kind: "radio",
  id: AGE_FIELD_ID,
  label: "Are you 18 years of age or older?",
  options: YES_NO,
};

const FACIAL_FORM: IntakeForm = {
  id: "facial",
  title: "Facial Consultation",
  intro:
    "A few questions so your esthetician can tailor the treatment to your skin before you arrive.",
  sections: [
    { title: "About you", fields: [ageField] },
    {
      title: "Your skin",
      fields: [
        {
          kind: "checkboxes",
          id: "skin_type",
          label: "How would you describe your skin type?",
          help: "Select all that apply.",
          options: ["Dry", "Oily", "Normal", "Combination", "Sensitive"],
        },
        {
          kind: "checkboxes",
          id: "skin_concerns",
          label: "What are your main skin concerns, or what would you like to prevent?",
          help: "Select all that apply.",
          options: [
            "Signs of aging",
            "Hyperpigmentation or uneven tone",
            "Sensitivity",
            "Redness or rosacea",
            "Acne or breakouts",
          ],
        },
        {
          kind: "checkboxes",
          id: "home_routine",
          label: "Which steps are part of your at-home skincare routine?",
          help: "Select all that apply.",
          options: [
            "Cleanser",
            "Toner",
            "Exfoliant",
            "Serums or facial oils",
            "Moisturizer",
            "Eye or lip care",
            "Face masks",
            "No regular routine yet",
          ],
          exclusiveOption: "No regular routine yet",
        },
        {
          kind: "select",
          id: "last_facial",
          label: "When was your last professional facial?",
          options: [
            "This will be my first facial",
            "Within the past month",
            "One to three months ago",
            "Three to six months ago",
            "More than six months ago",
          ],
        },
      ],
    },
    {
      title: "Health & sensitivities",
      fields: [
        {
          kind: "radio",
          id: "allergies",
          label: "Do you have any allergies or sensitivities we should know about?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "allergies_detail",
          label: "Please tell us about your allergies or sensitivities.",
          placeholder: "Products, ingredients, or anything else your esthetician should know.",
          showIf: { field: "allergies", equals: "Yes" },
        },
      ],
    },
    {
      title: "Product preferences",
      fields: [
        {
          kind: "radio",
          id: "cleanser_pref",
          label: "Which cleanser texture do you prefer?",
          options: ["Foaming", "Milky or creamy", "Oil-based"],
        },
        {
          kind: "radio",
          id: "exfoliant_pref",
          label: "Do you prefer a gentle or a more active exfoliant?",
          options: ["Gentle", "Active"],
        },
        {
          kind: "radio",
          id: "moisturizer_pref",
          label: "Which moisturizer finish do you prefer?",
          options: ["Matte", "Medium", "Dewy"],
        },
      ],
    },
  ],
  acknowledgements: [
    "I have been open about anything that may have a bearing on this treatment — including pregnancy, recent peels or surgery, allergies, a tendency to cold sores, the use of retinol, Accutane or hormonal medication, laser hair removal, and recent or planned sun or tanning-bed exposure.",
    "I understand that the best results come from a course of treatments together with daily home care, including sunscreen.",
    "I understand that mild redness, irritation or breakouts can occur after a facial, and that I should let my esthetician know if irritation persists.",
    "I understand that every person responds to treatment differently and that specific results cannot be guaranteed.",
  ],
};

const CARBON_LASER_FORM: IntakeForm = {
  id: "carbon-laser",
  title: "Carbon Laser Facial Consultation",
  intro:
    "The carbon laser facial is an advanced treatment, so we ask a little more before your visit. Your answers stay private and help us treat you safely.",
  sections: [
    { title: "About you", fields: [ageField] },
    {
      title: "Medical history",
      fields: [
        {
          kind: "checkboxes",
          id: "medical_history",
          label: "Do any of the following apply to you?",
          help: "Select all that apply.",
          options: [
            "Pregnancy or breastfeeding",
            "Diabetes",
            "Epilepsy",
            "Cancer (current or past)",
            "Heart condition",
            "Autoimmune disorder",
            "Hormonal imbalance",
            "Cold sores or herpes simplex",
            "Skin allergies",
            "Keloid scarring",
            "Recent surgery",
            "Metal implants in the treatment area",
            "Accutane (isotretinoin) in the past 6–12 months",
            "None of these apply to me",
          ],
          exclusiveOption: "None of these apply to me",
        },
        {
          kind: "radio",
          id: "medications",
          label: "Are you currently taking any medications?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "medications_list",
          label: "Please list the medications you are currently taking.",
          showIf: { field: "medications", equals: "Yes" },
        },
      ],
    },
    {
      title: "Skin history",
      fields: [
        {
          kind: "checkboxes",
          id: "skin_history",
          label: "Does your skin currently have, or has it recently had, any of the following?",
          help: "Select all that apply.",
          options: [
            "Sensitive skin",
            "Acne or breakouts",
            "Pigmentation or dark spots",
            "Rosacea",
            "Eczema",
            "Psoriasis",
            "Sun damage",
            "An active infection or open wounds",
            "A chemical peel in the past month",
            "A laser treatment in the past month",
            "Botox or fillers in the past two weeks",
            "Retinol or Retin-A in the past seven days",
            "None of these apply to me",
          ],
          exclusiveOption: "None of these apply to me",
        },
        {
          kind: "textarea",
          id: "current_products",
          label: "Which skincare products are you currently using?",
          placeholder: "Brands or product types — or simply write “none”.",
        },
        {
          kind: "textarea",
          id: "skin_goals",
          label: "What would you like this treatment to address?",
          placeholder: "Your skin concerns and the results you're hoping for.",
        },
      ],
    },
    {
      title: "Lifestyle",
      fields: [
        { kind: "radio", id: "sunscreen", label: "Do you use sunscreen daily?", options: YES_NO },
        { kind: "radio", id: "smoking", label: "Do you smoke?", options: YES_NO },
        {
          kind: "radio",
          id: "sun_exposure",
          label: "Have you tanned or had significant sun exposure in the past two weeks?",
          options: YES_NO,
        },
      ],
    },
  ],
  acknowledgements: [
    "I understand that the carbon laser facial may not be suitable for skin with an active infection, open wounds, a severe acne flare-up or recent sunburn, during pregnancy, or alongside certain medications or medical conditions — and that my technician may adapt or decline the treatment where it would not be safe.",
    "I understand the possible temporary side effects, including redness, mild swelling, sensitivity, dryness and short-lived breakouts.",
    "I agree to follow all pre-care and aftercare guidance provided by my technician.",
    "I understand that results vary from person to person and that a series of sessions may be recommended.",
  ],
};

const SUGARING_FORM: IntakeForm = {
  id: "sugaring",
  title: "Body Sugaring Consultation",
  intro:
    "A short consultation so we can sugar your skin safely and comfortably — it takes about two minutes.",
  sections: [
    { title: "About you", fields: [ageField] },
    {
      title: "Health information",
      fields: [
        { kind: "radio", id: "pregnant", label: "Are you currently pregnant?", options: YES_NO },
        { kind: "radio", id: "diabetes", label: "Do you have diabetes?", options: YES_NO },
        {
          kind: "radio",
          id: "allergies",
          label: "Do you have any allergies?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "allergies_detail",
          label: "Please tell us about your allergies.",
          showIf: { field: "allergies", equals: "Yes" },
        },
        {
          kind: "radio",
          id: "active_products",
          label:
            "Are you currently using retinol, Accutane, AHA/BHA acids, or steroid creams?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "active_products_list",
          label: "Please list which ones.",
          showIf: { field: "active_products", equals: "Yes" },
        },
        {
          kind: "checkboxes",
          id: "skin_conditions",
          label: "Do any of the following currently affect the area being treated?",
          help: "Select all that apply.",
          options: [
            "Skin sensitivity",
            "Eczema",
            "Psoriasis",
            "Varicose veins",
            "Open cuts or wounds",
            "Sunburn",
            "None of these",
          ],
          exclusiveOption: "None of these",
        },
      ],
    },
    {
      title: "Hair-removal history",
      fields: [
        {
          kind: "radio",
          id: "sugared_before",
          label: "Have you had body sugaring before?",
          options: YES_NO,
        },
        {
          kind: "select",
          id: "last_method",
          label: "What was your most recent hair-removal method?",
          options: [
            "Shaving",
            "Waxing",
            "Sugaring",
            "Laser",
            "Other",
            "This will be my first hair-removal service",
          ],
        },
        {
          kind: "select",
          id: "last_service",
          label: "When was your last hair-removal service?",
          options: [
            "Within the past week",
            "One to four weeks ago",
            "One to three months ago",
            "More than three months ago",
            "I've never had one",
          ],
        },
        {
          kind: "checkboxes",
          id: "past_reactions",
          label: "Have you experienced any of the following after hair removal?",
          help: "Select all that apply.",
          options: ["Redness", "Ingrown hairs", "Bruising", "Rash", "None of these"],
          exclusiveOption: "None of these",
        },
      ],
    },
    {
      title: "Treatment areas",
      fields: [
        {
          kind: "checkboxes",
          id: "areas",
          label: "Which areas would you like sugared at this visit?",
          help: "Your booked treatment covers its own area — tick anything else you'd like and we'll plan the time together.",
          options: [
            "Eyebrows",
            "Upper lip",
            "Chin",
            "Full face",
            "Underarms",
            "Arms",
            "Legs",
            "Bikini",
            "Brazilian",
            "Back",
            "Chest",
            "Other",
          ],
        },
        {
          kind: "text",
          id: "areas_other",
          label: "Please tell us which other area.",
          showIf: { field: "areas", includes: "Other" },
        },
      ],
    },
  ],
  acknowledgements: [
    "I understand that temporary redness, sensitivity or irritation can occur after sugaring.",
    "I have disclosed all relevant medical conditions, skin conditions and medications to my esthetician.",
    "I agree to follow the aftercare guidance provided after my treatment.",
  ],
};

const LASH_FORM: IntakeForm = {
  id: "lash-extensions",
  title: "Lash Extension Consultation",
  intro:
    "Lash extensions sit close to the eye, so we ask every guest these questions before their appointment. Your answers help us choose the safest, most flattering set for you.",
  sections: [
    { title: "About you", fields: [ageField] },
    {
      title: "Eye & medical history",
      fields: [
        {
          kind: "checkboxes",
          id: "eye_history",
          label: "Do any of the following apply to you?",
          help: "Select all that apply.",
          options: [
            "Sensitive eyes",
            "Contact lenses",
            "A recent eye infection",
            "Dry eyes",
            "Watery eyes",
            "Allergies",
            "Recent eye surgery",
            "Claustrophobia or difficulty lying still",
            "Skin sensitivity",
            "Pregnancy or breastfeeding",
            "Currently using Retin-A or Accutane",
            "Another medical condition",
            "None of these apply to me",
          ],
          exclusiveOption: "None of these apply to me",
        },
        {
          kind: "text",
          id: "eye_history_other",
          label: "Please tell us about the medical condition.",
          showIf: { field: "eye_history", includes: "Another medical condition" },
        },
        {
          kind: "radio",
          id: "medications",
          label: "Are you currently taking any medications?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "medications_list",
          label: "Please list the medications you are currently taking.",
          showIf: { field: "medications", equals: "Yes" },
        },
        {
          kind: "radio",
          id: "adhesive_allergy",
          label:
            "Do you have any known allergies to adhesives, tape, latex, or beauty products?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "adhesive_allergy_detail",
          label: "Please tell us more about that allergy.",
          showIf: { field: "adhesive_allergy", equals: "Yes" },
        },
      ],
    },
    {
      title: "Lash history",
      fields: [
        {
          kind: "radio",
          id: "worn_before",
          label: "Have you worn lash extensions before?",
          options: YES_NO,
        },
        {
          kind: "select",
          id: "last_application",
          label: "When was your most recent application or refill?",
          options: [
            "I'm wearing extensions right now",
            "Within the past month",
            "One to three months ago",
            "More than three months ago",
          ],
          showIf: { field: "worn_before", equals: "Yes" },
        },
        {
          kind: "radio",
          id: "product_reaction",
          label: "Have you ever had a reaction to lash products?",
          options: YES_NO,
        },
        {
          kind: "textarea",
          id: "product_reaction_detail",
          label: "Please describe the reaction.",
          showIf: { field: "product_reaction", equals: "Yes" },
        },
        {
          kind: "radio",
          id: "mascara",
          label: "Do you wear mascara regularly?",
          options: YES_NO,
        },
        {
          kind: "radio",
          id: "oil_products",
          label: "Do you use oil-based skincare or makeup around your eyes?",
          options: YES_NO,
        },
      ],
    },
    {
      title: "Your lash look",
      fields: [
        {
          kind: "select",
          id: "style",
          label: "Which lash style do you prefer?",
          options: [
            "Natural",
            "Classic",
            "Hybrid",
            "Volume",
            "Mega volume",
            "Wispy",
            "Cat eye",
            "Doll eye",
            "I'd like my technician's recommendation",
          ],
        },
        {
          kind: "radio",
          id: "length",
          label: "Which length do you prefer?",
          options: ["Short", "Medium", "Long", "My technician's recommendation"],
        },
        {
          kind: "radio",
          id: "curl",
          label: "Which curl do you prefer?",
          options: ["J curl", "B curl", "C curl", "D curl", "My technician's recommendation"],
        },
      ],
    },
  ],
  acknowledgements: [
    "I understand that proper aftercare is important for lash retention and for the health of my eyes, and I agree to follow the aftercare guidance provided by my technician.",
    "I understand that lash extensions require maintenance, with refill appointments roughly every two to three weeks.",
    "I understand the possible risks, including irritation or an allergic reaction, and I consent to the lash extension procedure performed by Harav Salon & Spa.",
  ],
};

const GENERAL_FORM: IntakeForm = {
  id: "general",
  title: "Before your visit",
  intro:
    "No questionnaire is needed for this treatment — just a quick acknowledgement before you book.",
  sections: [],
  acknowledgements: [
    "I will let my technician know, before my treatment begins, about any allergies, skin sensitivities, medical conditions — including pregnancy — or medications that could affect my service.",
    "I understand that every person responds to treatment differently, and that my technician may adapt or decline a service where it would not be safe or suitable.",
  ],
};

export const INTAKE_FORMS: Record<IntakeFormId, IntakeForm> = {
  facial: FACIAL_FORM,
  "carbon-laser": CARBON_LASER_FORM,
  "lash-extensions": LASH_FORM,
  sugaring: SUGARING_FORM,
  general: GENERAL_FORM,
};

/** Lash & Brow services that take the lash-extension questionnaire. Lifts,
 *  tints, shaping and removals book with the general disclosure. */
const LASH_EXTENSION_SERVICES = new Set([
  "Sweet YY Lash Extensions",
  "Sweet Lash Classic",
  "Lash Fill (30–90 Min)",
]);

/** Which consultation a service carries. Matches by category slug + exact service name. */
export function intakeFormIdForService(categorySlug: string, serviceName: string): IntakeFormId {
  if (categorySlug === "facials") {
    return serviceName === "Carbon Laser Facial" ? "carbon-laser" : "facial";
  }
  if (categorySlug === "body-sugaring") return "sugaring";
  if (categorySlug === "lash-brow" && LASH_EXTENSION_SERVICES.has(serviceName)) {
    return "lash-extensions";
  }
  return "general";
}

export function requiresQuestionnaire(formId: IntakeFormId): boolean {
  return formId !== "general";
}

const DEFAULT_MAX_LENGTH = 1000;

export function isFieldVisible(field: IntakeField, answers: IntakeAnswers): boolean {
  if (!field.showIf) return true;
  const controlling = answers[field.showIf.field];
  if (field.showIf.equals !== undefined) return controlling === field.showIf.equals;
  if (field.showIf.includes !== undefined) {
    return Array.isArray(controlling) && controlling.includes(field.showIf.includes);
  }
  return true;
}

function allFields(form: IntakeForm): IntakeField[] {
  return form.sections.flatMap((s) => s.fields);
}

/** Validates answers against the form. Every visible field is required.
 *  Returns one message per failing field id; an empty object means valid. */
export function validateIntake(form: IntakeForm, answers: IntakeAnswers): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of allFields(form)) {
    if (!isFieldVisible(field, answers)) continue;
    const value = answers[field.id];

    if (field.kind === "radio" || field.kind === "select") {
      if (typeof value !== "string" || !field.options.includes(value)) {
        errors[field.id] = "Please choose an option.";
      }
      continue;
    }

    if (field.kind === "checkboxes") {
      if (!Array.isArray(value) || value.length === 0) {
        errors[field.id] = "Please select at least one option.";
        continue;
      }
      if (value.some((v) => !field.options.includes(v))) {
        errors[field.id] = "Please select from the listed options.";
        continue;
      }
      if (field.exclusiveOption && value.includes(field.exclusiveOption) && value.length > 1) {
        errors[field.id] = `“${field.exclusiveOption}” can't be combined with other options.`;
      }
      continue;
    }

    // text / textarea
    if (typeof value !== "string" || value.trim().length === 0) {
      errors[field.id] = "Please fill this in.";
    } else if (value.length > (field.maxLength ?? DEFAULT_MAX_LENGTH)) {
      errors[field.id] = "Please shorten this answer.";
    }
  }

  return errors;
}

/** True when the guest answered "No" to the 18+ question — online booking is
 *  blocked and the guest is asked to call instead. */
export function isUnder18(form: IntakeForm, answers: IntakeAnswers): boolean {
  if (!requiresQuestionnaire(form.id)) return false;
  return answers[AGE_FIELD_ID] === "No";
}

/** Strips unknown ids and answers to currently-hidden fields before storage. */
export function sanitizeIntake(form: IntakeForm, answers: IntakeAnswers): IntakeAnswers {
  const clean: IntakeAnswers = {};
  for (const field of allFields(form)) {
    if (!isFieldVisible(field, answers)) continue;
    const value = answers[field.id];
    if (value === undefined) continue;
    clean[field.id] = Array.isArray(value) ? value : value.trim();
  }
  return clean;
}

/** Flat label/answer pairs in form order — for the salon email and admin view. */
export function intakeSummary(
  formId: IntakeFormId,
  answers: IntakeAnswers,
): { label: string; value: string }[] {
  const form = INTAKE_FORMS[formId];
  if (!form) return [];
  return allFields(form)
    .filter((field) => isFieldVisible(field, answers) && answers[field.id] !== undefined)
    .map((field) => {
      const value = answers[field.id];
      return { label: field.label, value: Array.isArray(value) ? value.join(", ") : String(value) };
    });
}
