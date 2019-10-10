const express = require("express");

const Schemes = require("./scheme-model.js");
const {isValidScheme} = require('./scheme-validators')

const router = express.Router();

//localhost:5000/api/schemes/
router.get("/", (req, res) => {
  Schemes.find()
    .then(schemes => {
      res.json(schemes);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes" });
    });
});

//localhost:5000/api/schemes/:id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        res.json(scheme);
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get schemes", err });
    });
});

//localhost:5000/api/schemes/:id/steps
router.get("/:id/steps", (req, res) => {
  const { id } = req.params;
  console.log(id);
  Schemes.findSchemeSteps(id)
    .then(steps => {
      if (Number(steps.length)) {
        res.status(200).json(steps);
      } else {
        res
          .status(404)
          .json({ message: "Could not find steps for given scheme" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get steps", err });
    });
});

//POST        localhost:5000/api/schemes/
router.post("/", (req, res) => {
  const schemeBody = req.body;

  if (isValidScheme(schemeBody)) {
    Schemes.add(schemeBody)
      .then(scheme => {
        res.status(200).json(scheme);
      })
      .catch(err => {
        res.status(500).json({ message: "Failed to create new scheme" });
      });
  }else {
    res
      .status(400)
      .json({message: 'please include the scheme name'})
  }
});

//POST STEPS- localhost:5000/api/schemes/:id/steps
router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.addStep(stepData, id).then(step => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new step" });
      res.status(500).json({ DeveloperMessage: err });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
    .then(scheme => {
      if (scheme) {
        Schemes.update(changes, id).then(updatedScheme => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});


router.delete('/:id', (req, res) => {
  db('accounts')
  .where({id: req.params.id})
  .del()
  .then(count => {
      res.status(200).json(count)
  })
  .catch(error => {
      res.status(500).json(error)
  })
});

module.exports = router;
