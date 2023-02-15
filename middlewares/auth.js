const authorizedIds = require("../authorizedIds.json");

function auth(req, res, next) {
  const { id } = req.body;

  if (!authorizedIds.includes(id)) {
    return res.status(401).json({
      error: "L'id du compteur n'existe pas.",
    });
  }

  next();
}

module.exports = auth;
