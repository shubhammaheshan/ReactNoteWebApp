
export function generateurl(filterObj) {
    if(!filterObj.status){ delete filterObj.status}
    const url = new URLSearchParams(filterObj).toString();
    return "/todo?" + url;
}
