import {Route, Switch} from 'react-router-dom';
import { routes } from '../router';

const AppRouter = () => {
    return(
        <Switch>
              {routes.map(route => 
                <Route
                    component = {route.component}
                    path = {route.path}
                    key = {route.path}
                />
              )}
        </Switch>
    );
}

export default AppRouter;