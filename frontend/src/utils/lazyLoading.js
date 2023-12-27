// import { lazy } from "react";

// export const lazyLoading = (path, namedExportName = null) => {
//   // lazy loading takes the path and namedExportName (for named exports)
//   // returns lazy() whose promise resolves with the component in that path

//   return lazy(() => {
//     const promise = import(path);

//     if (namedExportName == null) {
//       return promise;
//     } else {
//       return promise.then((module) => ({ default: module[namedExportName] }));
//     }
//   });
// };

import { lazy } from "react";

export const lazyLoading = (componentPath) => {
  return lazy(() => {
    return import(`${componentPath}`);
  });
};
