import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("views/layout.tsx", [
    index("views/landing-page.tsx"),
    route("/trac-nghiem", "views/quizzes.tsx"),
    route("/trac-nghiem/:subjectCode/:page?", "views/quiz.tsx"),
    route("/tai-lieu", "views/documents.tsx"),
    route("/tai-lieu/:documentId", "views/document.tsx"),
    route("/dong-gop", "views/contribute.tsx"),
    route("*", "views/not-found.tsx"),
  ]),
] satisfies RouteConfig;
