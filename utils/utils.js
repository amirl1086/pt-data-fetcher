
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

module.exports = {
  buildQueryParams
}