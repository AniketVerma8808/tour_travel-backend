import Banner from "./banner.model.js";

export const createBannerService = async (payload) => {
    return Banner.create(payload);
};

export const getAllBannersService = async () => {
    return Banner.find()
        .sort({ order: 1, createdAt: -1 })
        .lean();
};

export const deleteBannerService = async (id) => {
    return Banner.findByIdAndDelete(id);
};