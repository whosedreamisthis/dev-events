import { HydratedDocument, Model, Schema, Types, model, models } from "mongoose";
import { Event } from "./event.model";

interface IBooking {
  eventId: Types.ObjectId;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type BookingDocument = HydratedDocument<IBooking>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const bookingSchema = new Schema<IBooking>(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => emailRegex.test(value),
        message: "Invalid email format.",
      },
    },
  },
  {
    timestamps: true,
  }
);

bookingSchema.pre("save", async function validateBooking(next) {
  const doc = this as BookingDocument;

  // Validate normalized email format before saving.
  if (!doc.email || !emailRegex.test(doc.email)) {
    return next(new Error("Invalid email format."));
  }

  // Verify the referenced event exists to prevent orphan bookings.
  if (doc.isNew || doc.isModified("eventId")) {
    const eventExists = await Event.exists({ _id: doc.eventId });
    if (!eventExists) {
      return next(new Error("Referenced event does not exist."));
    }
  }

  return next();
});

bookingSchema.index({ eventId: 1 });

export const Booking: Model<IBooking> =
  (models.Booking as Model<IBooking>) || model<IBooking>("Booking", bookingSchema);

