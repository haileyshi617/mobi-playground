const BASE_URL =
  'https://proxy.takemobi.io/mobility-planner/demo/v2/dialog/response?mode=MOBI_AGENT&session_id=';

const STATUS_MAP = {
  selected_filters: { src: 'User', status: 'include' },
  recommended_filters: { src: 'System', status: 'include' },
  not_recommended_filters: { src: 'System', status: 'exclude' },
  excluded_filters: { src: 'User', status: 'include' },
};

/**
 * @summary filter out tags that are either <not supported> or <not preferences but locations>
 * <not supported>
 * TODO: a temporary solution for V1 since we are not supporting flights and stays in this version, thus, filter out all tags if the categories are 'ACCOMMODATION'
 * <not preferences but locations>
 * TODO: "GEOLOCATION". But in the future this seems to be related to "Specific POIs". Needs a way to support this in the future.
 *
 * @param tags [{id, category, name, parent}]
 * @param excludeKeys Set<str>, set to ['ACCOMMODATION', 'GEOLOCATION'] for this version
 *
 * @returns [{id, category, name, parent}]
 */
function excludeTags(tags, excludeKeys = ['ACCOMMODATION', 'GEOLOCATION']) {
  const keySet = new Set(excludeKeys);
  return tags.filter((tag) => !keySet.has(tag.category));
}

export { BASE_URL, STATUS_MAP, excludeTags };
