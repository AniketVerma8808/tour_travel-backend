import TravelPackage from "./package.model.js";
import { generateSlug } from "./package.helper.js";

/**
 * Create Package
 */
const createPackage = async (data) => {
    const slug = generateSlug(data.title);

    const existingPackage =
        await TravelPackage.findOne({ slug });
    if (existingPackage) {
        return {
            success: false,
            statusCode: 409,
            message: "Package with this title already exists",
        };
    }

    const travelPackage =
        await TravelPackage.create({
            title: data.title?.trim(),
            slug,
            category: data.category,

            image: data.image?.trim() || "",

            vehicle: data.vehicle?.trim() || "Innova Crysta",

            duration: data.duration?.trim() || "",

            distance: Number(data.distance) || 0,

            baseKm: Number(data.baseKm) || 250,

            extraKmRate: Number(data.extraKmRate) || 17,

            oldPrice: data.oldPrice || null,

            price: Number(data.price),

            description: data.description?.trim() || "",

            inclusions: data.inclusions || [],

            exclusions: data.exclusions || [],

            isFeatured: data.isFeatured || false,

            status: data.status || "active",
        });

    return {
        success: true,
        statusCode: 201,
        message: "Package created successfully",
        package: travelPackage,
    };
};

/**
 * Public Packages
 */
const getActivePackages = async () => {
    const packages = await TravelPackage.find({ status: "active" })
        .sort({
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
const getAllPackages = async ({ page = 1, limit = 20, search = "", status = "", }) => {

    const query = {};
    if (status) { query.status = status; }

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

    const skip = (page - 1) * limit;

    const [packages, total,] = await Promise.all([
        TravelPackage.find(query)
            .sort({
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
        totalPages:
            Math.ceil(
                total / limit
            ),
        total,
        packages,
    };
};

/**
 * Package By Slug
 */
const getPackageBySlug = async (slug) => {
    const travelPackage = await TravelPackage.findOne({ slug, status: "active", }).lean();

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

/**
 * Update Package
 */
const updatePackage = async (id, data) => {
    const travelPackage = await TravelPackage.findById(id);

    if (!travelPackage) {
        return {
            success: false,
            statusCode: 404,
            message: "Package not found",
        };
    }

    if (
        data.title &&
        data.title !==
        travelPackage.title
    ) {
        const slug =
            generateSlug(
                data.title
            );

        const existingPackage =
            await TravelPackage.findOne({
                slug,
                _id: {
                    $ne: id,
                },
            });

        if (existingPackage) {
            return {
                success: false,
                statusCode: 409,
                message:
                    "Package title already exists",
            };
        }

        travelPackage.title =
            data.title.trim();

        travelPackage.slug =
            slug;
    }

    Object.assign(
        travelPackage,
        {
            category:
                data.category ??
                travelPackage.category,

            image:
                data.image ??
                travelPackage.image,

            vehicle:
                data.vehicle ??
                travelPackage.vehicle,

            duration:
                data.duration ??
                travelPackage.duration,

            distance:
                data.distance ??
                travelPackage.distance,

            baseKm:
                data.baseKm ??
                travelPackage.baseKm,

            extraKmRate:
                data.extraKmRate ??
                travelPackage.extraKmRate,

            oldPrice:
                data.oldPrice ??
                travelPackage.oldPrice,

            price:
                data.price ??
                travelPackage.price,

            description:
                data.description ??
                travelPackage.description,

            inclusions:
                data.inclusions ??
                travelPackage.inclusions,

            exclusions:
                data.exclusions ??
                travelPackage.exclusions,

            isFeatured:
                data.isFeatured ??
                travelPackage.isFeatured,
        }
    );

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
const updatePackageStatus = async (id, status) => {
    const validStatus = ["active", "inactive",];

    if (!validStatus.includes(status)
    ) {
        return {
            success: false,
            statusCode: 400,
            message: "Invalid status",
        };
    }

    const travelPackage = await TravelPackage.findById(id);

    if (!travelPackage) {
        return {
            success: false,
            statusCode: 404,
            message: "Package not found",
        };
    }

    travelPackage.status = status;

    await travelPackage.save();

    return {
        success: true,
        statusCode: 200,
        message: "Package status updated",
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

    await travelPackage.deleteOne();

    return {
        success: true,
        statusCode: 200,
        message:"Package deleted successfully",
    };
};

export default {
    createPackage,
    getActivePackages,
    getAllPackages,
    getPackageBySlug,
    updatePackage,
    updatePackageStatus,
    deletePackage,
};