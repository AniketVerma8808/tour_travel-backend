export const formatAdminResponse = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email,
});