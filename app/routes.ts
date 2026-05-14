import { type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.root.tsx"),
  ...prefix("en", [index("routes/home.en.tsx")]),
] satisfies RouteConfig;
