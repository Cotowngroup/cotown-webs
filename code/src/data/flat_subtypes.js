module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Resource_Resource_flat_subtypeList {
      id
      Code
      Name
      Name_en
      Texts: Resource_subtype_textListViaFlat_subtype_id ( 
        where: { Segment_id: { EQ: $id } }
      ) {
        Description
        Description_en
        Tour
      }
      Amenities: Resource_flat_amenityListViaFlat_subtype_id {
        Amenity: Resource_amenity_typeViaAmenity_type_id {
          id
          Name
          Name_en
          Icons: Media_amenityListViaAmenity_type_id (
            where: { Segment_id: { EQ: $id } }
          ) {
            id
          }
        }
      }
    }
  }`;
  const data = await gql(QUERY, config, 'flat_subtypes');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en,
    Texts: o.Texts,
    Amenities: o.Amenities
  } });
  return(json); 
};