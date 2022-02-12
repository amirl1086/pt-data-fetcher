

const express = require('express');
const router = express.Router();

const dbFormatting = require("../../utils/mongo");

const config = require('config');
const knessetConfig = config.remotes.knesset;

const utils = require('../utils/utils');

router.post('/syncVotesHeaders', async (req, res) => {
  console.log("routes votes updateVotesHeaders");
  const url = `${knessetConfig.domain.schema}://${knessetConfig.domain.host}/${knessetConfig.api.getVotesHeaders.path}`
  const method = `${knessetConfig.api.getVotesHeaders.method}`
  const { remoteFilters: knessetReqFilter, dbFilters: mongoFilter } = utils.buildQueryParams(req.query);

  let newVotesHeaders = await http_utils.sendRequest(url, method, knessetReqFilter);
  formatted_votes = dbFormating.votesHeaders(newVotesHeaders);
  existingVoteHeaders = await votesHeadersModel.find(mongoFilter).lean();

  const existingVoteHeadersMap = _.keyBy(existingVoteHeaders, "VoteId");
  const newVotesHeadersMap = _.keyBy(formatted_votes, "VoteId");
  bulkVotes = [];
  
  _.forEach(formatted_votes, (newVoteHeader) => {
      if(!existingVoteHeadersMap[newVoteHeader.VoteId]) {
          bulkVotes.push({
              insertOne: {
                  document: newVotesHeadersMap[newVoteHeader.VoteId]
              }
          });
      } else {
          bulkVotes.push({
              updateOne: {
                  filter: { _id: existingVoteHeadersMap[newVoteHeader.VoteId]._id.toString() },
                  update: {
                      $set: newVotesHeadersMap[newVoteHeader.VoteId]
                  },
                  upsert: true
              }
          });
      }
  });

  votesHeadersModel.bulkWrite(bulkVotes);

  res.status(200).end();
});