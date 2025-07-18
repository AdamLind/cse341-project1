const { body, validationResult } = require("express-validator");

const contactValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .notEmpty()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("favoriteColor").notEmpty().withMessage("Favorite color is required"),
  body("birthday")
    .notEmpty()
    .withMessage("Birthday is required")
    .isDate()
    .withMessage("Birthday must be a valid date"),
];

const validateContactData = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  console.log(
    "Raw validation errors:",
    JSON.stringify(errors.array(), null, 2)
  );

  const extractedErrors = errors.array().map((err) => {
    console.log("Processing error:", err);
    return {
      field: err.path || err.param || err.location || "unknown",
      message: err.msg,
    };
  });

  console.log("Extracted errors:", extractedErrors);

  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = {
  contactValidationRules,
  validateContactData,
};
