import mongoose from "mongoose";
import * as bannerService from "./banner.service.js";


export const createBanner = async (req, res) => {
    try {
        const { order, isActive } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });
        }

        const imageUrl = `${process.env.CLIENT_URL}/uploads/${req.file.filename}`;

        const banner = await bannerService.createBannerService({
            image: imageUrl,
            order,
            isActive,
        });

        return res.status(201).json({
            success: true,
            message: "Banner created successfully",
            data: banner,
        });

    } catch (error) {
        console.error("Create Banner Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const getAllBanners = async (req, res) => {
    try {
        const banners = await bannerService.getAllBannersService();

        return res.status(200).json({
            success: true,
            count: banners.length,
            data: banners,
        });
    } catch (error) {
        console.error("Get Banners Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


export const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid banner id",
            });
        }

        const banner = await bannerService.deleteBannerService(id);

        if (!banner) {
            return res.status(404).json({
                success: false,
                message: "Banner not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Banner deleted successfully",
        });
    } catch (error) {
        console.error("Delete Banner Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};