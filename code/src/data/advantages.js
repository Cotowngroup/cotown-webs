module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_AdvantagesList (
      orderBy: [{ attribute: Order }]
      where: {
        Segment_id: { EQ: $id }
      }
    ) {
      id
      Name
      Image { name }
      Second_image { name }
    }
  }`;
  const data = await gql(QUERY, config, 'advantages');
  return data.data;
};