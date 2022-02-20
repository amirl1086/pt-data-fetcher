

const express = require('express');
const router = express.Router();

const votesFormat = require("../utils/votes");
const votesModel = require("../utils/mongo/models/vote");

const config = require('config');
const knessetConfig = config.remotes.knesset;

const utils = require('../utils/utils');
const httpUtils = require('../utils/http');


router.post('/votes', async (req, res) => {
  console.log("routes votes updateVotesHeaders");
  const url = `${knessetConfig.domain.schema}://${knessetConfig.domain.host}/${knessetConfig.api.getVotesHeaders.path}`
  const method = `${knessetConfig.api.getVotesHeaders.method}`
  const { remoteFilters: knessetReqFilter, dbFilters: mongoFilter } = utils.buildQueryParams(req.query);

  const newVotes = await httpUtils.sendRequest(url, method, knessetReqFilter);
  newFormattedVotes = votesFormat.votes(newVotes);
  existingVoteHeaders = await votesModel.votes.find(mongoFilter).lean();

  utils.syncBulk(newFormattedVotes, existingVoteHeaders, 'voteId')

  res.status(200).end();
});

module.exports = router;