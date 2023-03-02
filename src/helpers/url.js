
export function generateurl(filterObj) {
  let url = `/todo?_page=${filterObj.page}&_limit=${filterObj.pageLimit}&_sort=${filterObj.sort}&_order=${filterObj.order}&title_like=${filterObj.search_title}`;
  if (filterObj.completed) {
    url = url + `&status=${filterObj.completed}`;
  }
  return url;
}
