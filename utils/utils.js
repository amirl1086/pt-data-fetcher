
const config = require('config');
const knessetConfig = config.remotes.knesset;

const buildQueryParams = (query) => {
  const remoteFilters = {}
  const dbFilters = {}
  if(query.days) {
      remoteFilters.SearchType = knessetConfig.filters.dateRangeSearchType;
      remoteFilters.FromDate = moment().subtract(query.days, "days").format(knessetConfig.formats.date);
      remoteFilters.ToDate = moment().format(knessetConfig.formats.date);
      dbFilters = {
          "VoteDate": { "$gte": moment().subtract(query.days, "days").format(knessetConfig.formats.date) }
      };
  }
  return { remoteFilters, dbFilters };
}

const syncBulk = (existingItems, newItems, keyId, mongoModel) => {
  const existingMap = _.keyBy(existingItems, keyId);
  const newMap = _.keyBy(newItems, keyId);
  bulkResult = [];
  
  _.forEach(newItems, (newItem) => {
    bulkResult.push(existingMap[newItem[keyId]] ? 
      { updateOne: {
          filter: { _id: existingMap[newItem[keyId]]._id.toString() },
          update: {
              $set: newMap[newItem[keyId]]
          },
          upsert: true
      }}
      : 
      { insertOne: {
          document: newMap[newItem[keyId]]
      }}
    );
  });

  mongoModel.bulkWrite(bulkResult);
}

module.exports = {
  buildQueryParams,
  syncBulk
}