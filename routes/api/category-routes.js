const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll()
    .then((dbCategoryData) => {
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock"],
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res
          .status(404)
          .json({ message: "There is not a category with the specified ID." });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Category.create({
    id: req.body.id,
    category_name: req.body.category_name,
  })
    .then((dbCategoryData) => {
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedCategoryData) => {
      if (!updatedCategoryData) {
        res
          .status(404)
          .json({ message: "Could not find a category with that ID." });
        return;
      }
      res.json(updatedCategoryData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(404).json({
          message: "Could not find a category with the requested id.",
        });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
