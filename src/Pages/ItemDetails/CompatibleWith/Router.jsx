import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const CompatibleWith = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));




function ItemRoute() {
    return (
        <>
            <Switch>
                <Route path="/item-detail/plugin/list" component={CompatibleWith} />
                <Route path="/item-detail/plugin/add" component={Create} />
                <Route path="/item-detail/plugin/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/plugin"
                    to="/item-detail/plugin/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute