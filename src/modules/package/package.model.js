import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "local-tour",
        "outstation-tour",
        "airport-transfer",
      ],
      required: true,
      index: true,
    },

    image: {
      type: String,
      default: "",
    },

    vehicle: {
      type: String,
      default: "Innova Crysta",
    },

    duration: {
      type: String,
      default: "",
    },

    distance: {
      type: Number,
      default: 0,
    },

    baseKm: {
      type: Number,
      default: 250,
    },

    extraKmRate: {
      type: Number,
      default: 17,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    inclusions: [
      {
        type: String,
        trim: true,
      },
    ],

    exclusions: [
      {
        type: String,
        trim: true,
      },
    ],

    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

packageSchema.index({
  status: 1,
  createdAt: -1,
});

const TravelPackage = mongoose.model(
  "TravelPackage",
  packageSchema
);

export default TravelPackage;