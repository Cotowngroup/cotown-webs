// Resources with a long lock (retrieved once per build)
let locked;

module.exports = async (data, config, name) => {

  if (name == undefined)
    return undefined;

  // Requirements
  const sql = require('./sql');

  // Get locked resources
  if (locked == undefined)
    locked = sql('/locked', config, 'locked').then(ids => new Set(ids));
  const ids = await locked;

  // Remove locked resources and empty buildings
  const buildings = (list) => list
    .map(b => ({ ...b, Resources: b.Resources.filter(r => !ids.has(r.id)) }))
    .filter(b => b.Resources.length > 0);

  // Buildings
  if (name == 'buildings')
    return buildings(data);

  // Locations, remove also empty districts and locations
  return data
    .map(l => ({
      ...l,
      DistrictListViaLocation_id: l.DistrictListViaLocation_id
        .map(d => ({
          ...d,
          BuildingListViaDistrict_id: d.BuildingListViaDistrict_id
            .map(b => ({ ...b, ResourceListViaBuilding_id: b.ResourceListViaBuilding_id.filter(r => !ids.has(r.id)) }))
            .filter(b => b.ResourceListViaBuilding_id.length > 0)
        }))
        .filter(d => d.BuildingListViaDistrict_id.length > 0)
    }))
    .filter(l => l.DistrictListViaLocation_id.length > 0);
};
