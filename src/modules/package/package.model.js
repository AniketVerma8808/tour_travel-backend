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
      index: true,
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
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    shortDescription: {
      type: String,
      trim: true,
      maxlength: 250,
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

    displayOrder: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },

    startingLocation: {
      type: String,
      default: "Varanasi",
      trim: true,
    },
    destinationLocation: {
      type: String,
      trim: true,
      default: "",
    },
    driverAllowance: {
      type: String,
      default: "Included",
    },

    extraCharges: [
      {
        type: String,
        trim: true,
      },
    ],

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

packageSchema.index({
  category: 1,
  status: 1,
});

const TravelPackage = mongoose.model(
  "TravelPackage",
  packageSchema
);

export default TravelPackage;