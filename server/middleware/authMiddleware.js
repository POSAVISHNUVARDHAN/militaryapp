function requireRole(role) {
  return function (req, res, next) {
    const user = req.body.user || req.user;
    if (!user || user.role !== role) {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }
    next();
  };
}

module.exports = requireRole;
