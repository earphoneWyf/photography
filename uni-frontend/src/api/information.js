import service from "./index";

// 获取展示的约拍信息
export const getAllDisplayed = () => {
  return service.get("/information/getAllDisplayed");
};
