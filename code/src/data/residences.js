module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    data: Building_BuildingList ( 
      orderBy: [{ attribute: Name }]
      where: { 
        Segment_id: { EQ: $id } 
        Building_type_id: { EQ: 3 } 
        Code: { NE: "SAR326" } 
      } 
    ) {
      id
      Code
      Name
      Address
      Lat_lon
      Description
      Description_en
      Description_private
      Description_private_en
      Details
      Details_en
      Details_private
      Details_private_en
      Title
      Title_en
      Title_private
      Title_private_en
      Meta_description
      Meta_description_en
      Meta_description_private
      Meta_description_private_en
      Header
      Header_en
      Header_private
      Header_private_en
      Tour
      Tour_private
      Segment_id
      Building_type_id
      District: DistrictViaDistrict_id {
        Name
        Description
        Description_en
        Location: LocationViaLocation_id {
          id
          Name
        }
        Photos: Media_districtListViaDistrict_id (
          orderBy: [{ attribute: Order }]
        ) {
          id
          Image_type
          Order
          Name
        }
      }
      Resources: ResourceListViaBuilding_id {
        id
        Code
        Sale_type
      }
      Services: Building_serviceListViaBuilding_id {
        Service: Building_service_typeViaService_id {
          id
          Name
          Name_en
          Images: Media_service_typeListViaService_type_id (
            joinType: INNER
            where: { Segment_id: { EQ: $id } }
          ) {
            id
          }
        }
      }
      Photos: Media_buildingListViaBuilding_id (
        orderBy: [{ attribute: Order }]
      ) {
        id
        Image_type
        Order
        Name
      }
    }
  }`;
  const data = await gql(QUERY, config, 'buildings');
  return data.data;
};