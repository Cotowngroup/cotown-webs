module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Resource_Resource_place_typeList (
      where: { NOT: { Code: { LIKE: "DUI_%" } } }
    ) {
      id
      Code
      Name
      Name_en
      Texts: Resource_place_textListViaPlace_type_id ( 
        where: { Segment_id: { EQ: $id } }
      ) {
        Location_id
        Building_id
        Description
        Description_en
      }
    }
  }`;
  const data = await gql(QUERY, config, 'place_types');
  const json = {};
  data.data.forEach(o => { json[o.Code] = { 
    id: o.id, 
    Code: o.Code, 
    Name: o.Name, 
    Name_en: o.Name_en, 
    Texts: o.Texts
  } });
  return(json); 
};