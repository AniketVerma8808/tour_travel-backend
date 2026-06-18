import Setting from "./setting.model.js";

/**
 * Get Website Settings
 */
const getSettings = async () => {
  const settings =
    await Setting.findOne().lean();

  return {
    success: true,
    statusCode: 200,
    settings: settings || {},
  };
};

/**
 * Create / Update Settings
 */
const updateSettings = async (data) => {
  let settings =
    await Setting.findOne();

  if (!settings) {
    settings =
      await Setting.create({
        companyName:
          data.companyName?.trim() || "",

        phone:
          data.phone?.trim() || "",

        whatsapp:
          data.whatsapp?.trim() || "",

        email:
          data.email
            ?.trim()
            ?.toLowerCase() || "",

        address:
          data.address?.trim() || "",

        logo:
          data.logo?.trim() || "",

        favicon:
          data.favicon?.trim() || "",

        facebook:
          data.facebook?.trim() || "",

        instagram:
          data.instagram?.trim() || "",

        youtube:
          data.youtube?.trim() || "",

        twitter:
          data.twitter?.trim() || "",

        footerText:
          data.footerText?.trim() || "",

        metaTitle:
          data.metaTitle?.trim() || "",

        metaDescription:
          data.metaDescription?.trim() || "",

        metaKeywords:
          Array.isArray(
            data.metaKeywords
          )
            ? data.metaKeywords
            : [],

        officeTiming:
          data.officeTiming?.trim() || "",

        mapEmbedUrl:
          data.mapEmbedUrl?.trim() || "",

        status:
          data.status || "active",
      });

    return {
      success: true,
      statusCode: 201,
      message:
        "Settings created successfully",
      settings,
    };
  }

  Object.assign(settings, {
    companyName:
      data.companyName ??
      settings.companyName,

    phone:
      data.phone ??
      settings.phone,

    whatsapp:
      data.whatsapp ??
      settings.whatsapp,

    email:
      data.email ??
      settings.email,

    address:
      data.address ??
      settings.address,

    logo:
      data.logo ??
      settings.logo,

    favicon:
      data.favicon ??
      settings.favicon,

    facebook:
      data.facebook ??
      settings.facebook,

    instagram:
      data.instagram ??
      settings.instagram,

    youtube:
      data.youtube ??
      settings.youtube,

    twitter:
      data.twitter ??
      settings.twitter,

    footerText:
      data.footerText ??
      settings.footerText,

    metaTitle:
      data.metaTitle ??
      settings.metaTitle,

    metaDescription:
      data.metaDescription ??
      settings.metaDescription,

    metaKeywords:
      data.metaKeywords ??
      settings.metaKeywords,

    officeTiming:
      data.officeTiming ??
      settings.officeTiming,

    mapEmbedUrl:
      data.mapEmbedUrl ??
      settings.mapEmbedUrl,

    status:
      data.status ??
      settings.status,
  });

  await settings.save();

  return {
    success: true,
    statusCode: 200,
    message:
      "Settings updated successfully",
    settings,
  };
};

export default {
  getSettings,
  updateSettings,
};