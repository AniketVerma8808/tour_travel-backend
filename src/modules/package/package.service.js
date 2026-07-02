import TravelPackage from "./package.model.js";
import Booking from "../booking/booking.model.js";import {
  generateSlug,
  parseArray,
} from "./package.helper.js";

/**
 * Create Package
 */
const createPackage = async (data, file) => {
  const slug = generateSlug(data.title);

  const existingPackage =
    await TravelPackage.findOne({ slug });

  if (existingPackage) {
    return {
      success: false,
      statusCode: 409,
      message:
        "Package with this title already exists",
    };
  }

  const imageUrl = file
    ? `${process.env.SERVER_URL}/uploads/package/${file.filename}`
    : "";

  const travelPackage =
    await TravelPackage.create({
      title: data.title?.trim(),

      slug,

      category: data.category,

      image: imageUrl,

      vehicle:
        data.vehicle?.trim() ||
        "Innova Crysta",

      startingLocation:
        data.startingLocation?.trim() || "Varanasi",

      destinationLocation:
        data.destinationLocation?.trim() || "",

      duration:
        data.duration?.trim() || "",

      distance: Number(
        data.distance ?? 0
      ),

      baseKm: Number(
        data.baseKm ?? 250
      ),

      extraKmRate: Number(
        data.extraKmRate ?? 17
      ),

      oldPrice:
        data.oldPrice !== undefined &&
          data.oldPrice !== null
          ? Number(data.oldPrice)
          : null,

      price: Number(data.price),

      description:
        data.description?.trim() ||
        "",

      shortDescription:
        data.shortDescription?.trim() ||
        "",
      inclusions: parseArray(data.inclusions),
      exclusions: parseArray(data.exclusions),
      displayOrder: Number(
        data.displayOrder ?? 0
      ),

      isFeatured:
        data.isFeatured ?? false,

      status:
        data.status || "active",
    });

  return {
    success: true,
    statusCode: 201,
    message:
      "Package created successfully",
    package: travelPackage,
  };
};

/**
 * Public Packages
 */
const getActivePackages = async () => {
  const packages = await TravelPackage.find({
    status: "active",
  })
    .sort({
      displayOrder: 1,
      isFeatured: -1,
      createdAt: -1,
    })
    .lean();

  return {
    success: true,
    statusCode: 200,
    count: packages.length,
    packages,
  };
};

/**
 * Admin Packages
 */
const getAllPackages =
  async ({
    page = 1,
    limit = 20,
    search = "",
    status = "",
  }) => {
    page = Number(page);
    limit = Number(limit);

    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          category: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const skip =
      (page - 1) * limit;

    const [packages, total] =
      await Promise.all([
        TravelPackage.find(query)
          .sort({
            displayOrder: 1,
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean(),

        TravelPackage.countDocuments(
          query
        ),
      ]);

    return {
      success: true,
      statusCode: 200,
      page,
      limit,
      total,
      totalPages:
        Math.ceil(
          total / limit
        ),
      packages,
    };
  };

/**
 * Package By Slug
 */
const getPackageBySlug =
  async (slug) => {
    const travelPackage =
      await TravelPackage.findOne({
        slug,
        status: "active",
      }).lean();

    if (!travelPackage) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Package not found",
      };
    }

    return {
      success: true,
      statusCode: 200,
      package: travelPackage,
    };
  };

/**
 * Update Package
 */
const updatePackage = async (id, data) => {
  console.log("ID:", id);
  console.log("DATA:", data);
  const travelPackage = await TravelPackage.findById(id);

  if (!travelPackage) {
    return {
      success: false,
      statusCode: 404,
      message: "Package not found",
    };
  }

  // Update title & slug
  if (
    data.title &&
    data.title.trim() !== travelPackage.title
  ) {
    const slug = generateSlug(data.title);

    const existingPackage =
      await TravelPackage.findOne({
        slug,
        _id: { $ne: id },
      });

    if (existingPackage) {
      return {
        success: false,
        statusCode: 409,
        message: "Package title already exists",
      };
    }

    travelPackage.title = data.title.trim();
    travelPackage.slug = slug;
  }

  // Basic Information
  if (data.category !== undefined)
    travelPackage.category = data.category;

  if (data.image !== undefined)
    travelPackage.image = data.image;

  if (data.vehicle !== undefined)
    travelPackage.vehicle = data.vehicle;

  if (data.startingLocation !== undefined)
    travelPackage.startingLocation =
      data.startingLocation;

  if (data.destinationLocation !== undefined)
    travelPackage.destinationLocation =
      data.destinationLocation;

  // Trip Details
  if (data.duration !== undefined)
    travelPackage.duration = data.duration;

  if (data.distance !== undefined)
    travelPackage.distance = Number(data.distance);

  if (data.baseKm !== undefined)
    travelPackage.baseKm = Number(data.baseKm);

  if (data.extraKmRate !== undefined)
    travelPackage.extraKmRate = Number(
      data.extraKmRate
    );

  // Pricing
  if (data.price !== undefined)
    travelPackage.price = Number(data.price);

  if (data.oldPrice !== undefined) {
    travelPackage.oldPrice =
      data.oldPrice === null ||
        data.oldPrice === ""
        ? null
        : Number(data.oldPrice);
  }

  // Description
  if (data.description !== undefined)
    travelPackage.description =
      data.description;

  if (data.shortDescription !== undefined)
    travelPackage.shortDescription =
      data.shortDescription;

  // Package Details
if (data.inclusions !== undefined)
  travelPackage.inclusions = parseArray(data.inclusions);

if (data.exclusions !== undefined)
  travelPackage.exclusions = parseArray(data.exclusions);

  // Display Settings
  if (data.displayOrder !== undefined)
    travelPackage.displayOrder = Number(
      data.displayOrder
    );

  if (data.isFeatured !== undefined)
    travelPackage.isFeatured =
      data.isFeatured;

  if (data.status !== undefined)
    travelPackage.status = data.status;

  await travelPackage.save();

  return {
    success: true,
    statusCode: 200,
    message: "Package updated successfully",
    package: travelPackage,
  };
};

/**
 * Update Status
 */
const updatePackageStatus =
  async (
    id,
    status
  ) => {
    const validStatus = [
      "active",
      "inactive",
    ];

    if (
      !validStatus.includes(
        status
      )
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Invalid status",
      };
    }

    const travelPackage =
      await TravelPackage.findById(
        id
      );

    if (!travelPackage) {
      return {
        success: false,
        statusCode: 404,
        message:
          "Package not found",
      };
    }

    if (
      travelPackage.status ===
      status
    ) {
      return {
        success: false,
        statusCode: 400,
        message:
          "Package already in this status",
      };
    }

    travelPackage.status =
      status;

    await travelPackage.save();

    return {
      success: true,
      statusCode: 200,
      message:
        "Package status updated successfully",
    };
  };

/**
 * Delete Package
 */
const deletePackage = async (id) => {
  const travelPackage = await TravelPackage.findById(id);

  if (!travelPackage) {
    return {
      success: false,
      statusCode: 404,
      message: "Package not found",
    };
  }

  if (travelPackage.status === "active") {
    return {
      success: false,
      statusCode: 400,
      message:
        "Active package cannot be deleted. Please mark it as inactive first.",
    };
  }

  await travelPackage.deleteOne();

  return {
    success: true,
    statusCode: 200,
    message: "Package deleted successfully",
  };
};

const getPackageById = async (id) => {
  const travelPackage =
    await TravelPackage.findById(id).lean();

  if (!travelPackage) {
    return {
      success: false,
      statusCode: 404,
      message: "Package not found",
    };
  }

  return {
    success: true,
    statusCode: 200,
    package: travelPackage,
  };
};


export default {
  createPackage,
  getActivePackages,
  getAllPackages,
  getPackageBySlug,
  getPackageById,
  updatePackage,
  updatePackageStatus,
  deletePackage,
};