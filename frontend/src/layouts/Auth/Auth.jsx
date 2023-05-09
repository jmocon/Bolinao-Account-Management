import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// core components
import FixedPlugin from 'components/FixedPlugin/FixedPlugin.js';

import routes from 'routes.js';

import { BackgroundColorContext } from 'contexts/BackgroundColorContext';

const Auth = () => {
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
          <div className='wrapper'>
            <Switch>
              {getRoutes(routes)}
              <Redirect from='*' to='/auth/login' />
            </Switch>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </React.Fragment>
      )}
    </BackgroundColorContext.Consumer>
  );
};

export default Auth;
