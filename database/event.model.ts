import { HydratedDocument, Model, Schema, model, models } from "mongoose";

interface IEvent {
  title: string;
  slug: string;
  description: string;
  overview: string;
  image: string;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: string[];
  organizer: string;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

type EventDocument = HydratedDocument<IEvent>;

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const normalizeTime = (value: string): string => {
  const trimmed = value.trim();
  const twelveHourMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*([ap]m)$/i);

  if (twelveHourMatch) {
    const [, rawHour, rawMinute, meridiem] = twelveHourMatch;
    let hour = Number(rawHour);
    const minute = Number(rawMinute);

    if (hour < 1 || hour > 12 || minute > 59) {
      throw new Error("Invalid time value.");
    }

    const lowerMeridiem = meridiem.toLowerCase();
    if (lowerMeridiem === "pm" && hour !== 12) hour += 12;
    if (lowerMeridiem === "am" && hour === 12) hour = 0;

    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
  }

  const twentyFourHourMatch = trimmed.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (twentyFourHourMatch) {
    const [, hour, minute] = twentyFourHourMatch;
    return `${String(Number(hour)).padStart(2, "0")}:${minute}`;
  }

  throw new Error("Time must be in HH:mm or h:mm AM/PM format.");
};

const eventSchema = new Schema<IEvent>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    description: { type: String, required: true, trim: true },
    overview: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    venue: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    time: { type: String, required: true, trim: true },
    mode: { type: String, required: true, trim: true },
    audience: { type: String, required: true, trim: true },
    agenda: { type: [String], required: true, default: [] },
    organizer: { type: String, required: true, trim: true },
    tags: { type: [String], required: true, default: [] },
  },
  {
    timestamps: true,
  }
);

eventSchema.pre("save", function validateAndNormalize() {
  const stringFields: Array<keyof Pick<
    IEvent,
    | "title"
    | "description"
    | "overview"
    | "image"
    | "venue"
    | "location"
    | "date"
    | "time"
    | "mode"
    | "audience"
    | "organizer"
  >> = [
    "title",
    "description",
    "overview",
    "image",
    "venue",
    "location",
    "date",
    "time",
    "mode",
    "audience",
    "organizer",
  ];

  // Enforce non-empty required string fields.
  for (const field of stringFields) {
    if (!this[field] || this[field].trim().length === 0) {
      throw new Error(`${field} is required.`);
    }
  }

  // Enforce non-empty required array fields.
  if (!Array.isArray(this.agenda) || this.agenda.length === 0) {
    throw new Error("agenda is required and must contain at least one item.");
  }
  if (!Array.isArray(this.tags) || this.tags.length === 0) {
    throw new Error("tags is required and must contain at least one item.");
  }

  // Generate URL-friendly slug only when the title changes.
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }

  // Normalize date to ISO-8601 and time to 24-hour HH:mm.
  const parsedDate = new Date(this.date);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date value.");
  }
  this.date = parsedDate.toISOString();

  try {
    this.time = normalizeTime(this.time);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid time value.";
    throw new Error(message);
  }
});

eventSchema.index({ slug: 1 }, { unique: true });

export const Event: Model<IEvent> =
  (models.Event as Model<IEvent>) || model<IEvent>("Event", eventSchema);

