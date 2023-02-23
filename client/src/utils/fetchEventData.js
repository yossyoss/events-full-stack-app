export const fetchEvents = async ({page, rowsPerPage}) => {
  const url = `http://localhost:3001/?page=${page}&size=${rowsPerPage}`
  const apiRes = await fetch(url);
  const json = await apiRes.json();
  return preperData(json)
};

export const postFilters = async (filterdTypes, page, rowsPerPage) => {
  const settings = createPostSettings(filterdTypes, page, rowsPerPage)
  const url = `http://localhost:3001/data/filter`
  const apiRes = await fetch(url, settings);
  const json = await apiRes.json();
  return preperData(json)
};


export const preperData = (res) => {
  const eventsList = res.data.map(item => {
    return {
        eventType: item.eventType,
        formattedEventType: item.formattedEventType,
        severity: item.severity,
        user: item.user,
        date: item.time,
        id: item.id
    }
});
return { eventsList, totalItems: res.totalItems, filterList: res.filterList }
}

export const createPostSettings = (filterdTypes, page, size) => {
  return {method: 'POST',
  headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
  body: JSON.stringify({ filterdTypes, page, size })}
};

