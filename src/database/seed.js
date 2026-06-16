import Admin from "../modules/admin/admin.model.js";

const createAdmin = async () => {
  const adminExists = await Admin.findOne({
    email: "admin@gmail.com",
  });

  if (adminExists) {
    console.log("✅ Admin already exists");
    return;
  }

  await Admin.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: "Admin@123",
  });

  console.log("✅ Admin created");
};

export default createAdmin;