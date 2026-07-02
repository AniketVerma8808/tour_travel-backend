
export const generateSlug = (title) => {
  return title
    ?.toLowerCase()
    ?.trim()
    ?.replace(/[^\w\s-]/g, "")
    ?.replace(/\s+/g, "-")
    ?.replace(/-+/g, "-");
};

export const parseArray = (value) => {
  if (!value) return [];

  // Already an array
  if (Array.isArray(value)) {
    return value
      .map((item) =>
        typeof item === "string" ? item.trim() : item
      )
      .filter(Boolean);
  }

  // JSON string
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);

      if (Array.isArray(parsed)) {
        return parsed
          .map((item) =>
            typeof item === "string"
              ? item.trim()
              : item
          )
          .filter(Boolean);
      }
    } catch (err) {
      // Ignore JSON parse error
    }

    // Comma separated fallback
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};