module.exports = async (req, res, next) => {
  const isAdmin = req.user.role === "ADMIN";
  if (!isAdmin) {
    return res.status(403).json({
      error: "This route is Protected and You dont Have Access to it!!",
    });
  } else {
    return next();
  }
};
