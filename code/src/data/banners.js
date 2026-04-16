module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_BannerList (
      orderBy: [{ attribute: id }]
      where: {
        Segment_id: { EQ: $id }
        Published: { EQ: true }
      }
    ) {
      id
      Link
      Link_en
      Page
      Published
      Text
      Text_en
    }
  }`;
  const data = await gql(QUERY, config, 'banners');
  return data.data;
};