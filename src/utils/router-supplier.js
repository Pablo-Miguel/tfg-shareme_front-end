import { router } from "../App";

export const getRouter = () => {
  return router;
};

export const navigate = (path) => {
  router.navigate(path);
};
