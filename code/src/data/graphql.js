module.exports = async (query, config, name) => {

  if (name == undefined)
    return undefined;

  // Requirements
  const K = require('./constants');
  const token = require('./token');
  const fetch = require('node-fetch');
  K.HEADER['Authorization'] = 'Bearer ' + await token();

  console.log('Retrieving GraphQL content ' + name + ' from ' + config.site);
  
  // Get token
  const variables = { id: config.siteid, authorization : await token() };

  // Get data
  const query_res = await fetch(K.SERVER + '/graphql', { method: 'POST', headers: K.HEADER, body: JSON.stringify({ "query": query, "variables": variables }) });
  const query_data = await query_res.json();

  return(query_data.data); 
};