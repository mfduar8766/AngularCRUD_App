const express = require("express");
const routes = express.Router();
const IssuesModel = require("../../Models/Issue");

routes.get("/issues", (req, res) => {
  IssuesModel.find((err, isseus) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.json(isseus);
  });
});

routes.get("/isseues/issue/:id", (req, res) => {
  let issuseId = req.params.id;
  IssuesModel.findById(issuseId, (err, issuse) => {
    if (err) {
      res.status(500).json({ msg: err });
    }
    res.json(issuse);
  });
});

routes.post("/issues/add", (req, res) => {
  let addedIssue = new IssuesModel(req.body);
  addedIssue
    .save()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(400).json({ err });
    });
});

routes.put("/issues/issue/:id/update", (req, res) => {
  let updatedIssueID = req.params.id;
  IssuesModel.findById(updatedIssueID, (err, issue) => {
    if (!issue) {
      res.status(500).json({ err });
    }
    issue.title = req.body.title;
    issue.responsible = req.body.responsible;
    issue.description = req.body.description;
    issue.severity = req.body.severity;
    issue.status = req.body.status;

    issue
      .save()
      .then(data => res.json(data))
      .catch(err => res.status(500).json({ err }));
  });
});

routes.delete("/issues/issue/:id/delete", (req, res) => {
  let deletedIssueId = req.params.id;
  IssuesModel.findByIdAndRemove({ _id: deletedIssueId }, (err, issue) => {
    if (err) {
      res.status(500).json({ err });
    }
    res.json("Removed Succesfully");
  });
});

module.exports = routes;
