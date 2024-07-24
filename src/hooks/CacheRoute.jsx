import React, { useState, useEffect } from "react";
import { useLocation, Route } from "react-router-dom";

const cache = {};

const CacheRoute = ({ path, element: Component, ...rest }) => {
  const location = useLocation();
  const [cachedElement, setCachedElement] = useState(null);

  useEffect(() => {
    if (cache[path]) {
      setCachedElement(cache[path]);
    } else {
      const elementInstance = <Component />;
      cache[path] = elementInstance;
      setCachedElement(elementInstance);
    }
  }, [path, Component]);

  return cachedElement ? (
    <Route path={path} element={cachedElement} {...rest} />
  ) : null;
};

export default CacheRoute;
