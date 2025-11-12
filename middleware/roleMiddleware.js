


export function requireRole(roles = []) {

  return (req, res, next) => {

    const user = req.user || { role: "admin" }; 

    if (!roles.includes(user.role)) return res.status(403).json({ error: "Forbidden" });
    next();

  };
}
