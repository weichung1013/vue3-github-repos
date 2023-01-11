import { Service } from "./config.js";

export const getService = async (endpoint, type, _) => {
  const service = await Service();
  if (type === "single") {
    return service.get(`${endpoint}/${_}`);
  } else if (type === "pagination") {
    // [per_page, page]
    return service.get(`${endpoint}?per_page=${_[0]}&page=${_[1]}`);
  } else {
    return service.get(endpoint);
  }
};
