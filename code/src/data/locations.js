module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
query data ($id: Int) {
    data: Geo_LocationList (
      orderBy: [{ attribute: Name }]
      where: { Published: { EQ: true } }
    ) {
      id
      Name
      Name_en
      DistrictListViaLocation_id (joinType: INNER) {
        BuildingListViaDistrict_id (joinType: INNER) {
          ResourceListViaBuilding_id (
            joinType: INNER
            where: { 
              Segment_id: { EQ: $id }
              Sale_type: { IN: [plazas, completo, ambos] } 
            }
          ) { 
            id
          }
        }
      }
      Texts: Location_textListViaLocation_id (
        joinType: INNER
        where: { Segment_id: { EQ: $id } }
      ) {
        Description
        Description_en
        Title
        Title_en
        Title_flat
        Title_flat_en
      }
      Images: Media_locationListViaLocation_id (
        joinType: INNER
        orderBy: [{ attribute: Order }]
        where: { Segment_id: { EQ: $id } }
      ) {
        id
        Order
        Name
        Image_type
      }
    }
  }`;
  const data = await gql(QUERY, config, 'locations');
  return data.data;
};