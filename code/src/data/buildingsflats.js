module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY  = `
  query data ($id: Int) {
    data: Building_BuildingList ( 
      orderBy: [{ attribute: Order }]
      where: { 
        Active: { EQ: true }
      } 
    ) {
      id
      Code
      Name
      Address
      Lat_lon
      Building_type_id
      District: DistrictViaDistrict_id {
        Name
        Location: LocationViaLocation_id {
          id
          Name
        }
        Texts: District_textListViaDistrict_id (
          joinType: INNER
          where: { 
            Segment_id: { EQ: $id }
          }
        ) {
          Description
          Description_en
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
      Texts: Building_textListViaBuilding_id (
        where: { Segment_id: { EQ: $id } }
      ) {
        Web_type
        Segment_id
        Description
        Description_en
        Details
        Details_en
        Title
        Title_en
        Meta_description
        Meta_description_en
        Header
        Header_en
        Tour
      }
      Resources: ResourceListViaBuilding_id (
        joinType: INNER
        where: { 
          Segment_id: { EQ: $id }
          Sale_type: { IN: [ completo, ambos ] }
        }
      ) {
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
  const data = await gql(QUERY, config, 'buildings flats');
  return data.data.map(building =>
    building.Code === 'SAR326'
      ? { ...building, Building_type_id: 1 }
      : building
  );  
};