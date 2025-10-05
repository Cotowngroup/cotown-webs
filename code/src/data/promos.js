module.exports = async (config) => {
  const sql = require('./sql');
  const data = await sql('/promo/' + config.siteid, config, 'promos');
  return data;
};