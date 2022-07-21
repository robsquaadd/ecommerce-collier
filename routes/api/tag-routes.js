const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  Tag.findAll({
    include: {
      model: Product,
      as: "product_tags",
      attributes: ["product_name", "price", "stock"],
    },
  })
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      as: "product_tags",
      attributes: ["product_name", "price", "stock"],
    },
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(404)
          .json({ message: "No tag with the specified ID was found!" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  })
    .then((dbTagData) => {
      res.json(dbTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedTagData) => {
      if (!updatedTagData) {
        res.status(404).json({ message: "No tag with that ID was found!" });
        return;
      }
      res.json(updatedTagData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deleteSuccessful) => {
      if (!deleteSuccessful) {
        res.status(404).json({ message: "No tag with that ID was found." });
        return;
      }
      res.json(deleteSuccessful);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
