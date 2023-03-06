import React,{lazy} from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';

const FilesIncluded = lazy(() => import('./index.jsx'));
const Create = lazy(() => import('./create.jsx'));
const Edit = lazy(() => import('./[Slug]/edit.jsx'));




function ItemRoute() {
    return (
        <>
            <Switch>
                <Route path="/item-detail/files/list" component={FilesIncluded} />
                <Route path="/item-detail/files/add" component={Create} />
                <Route path="/item-detail/files/edit/:id" component={Edit} />
                <Redirect
                    exact={true}
                    from="/item-detail/files"
                    to="/item-detail/files/list"
                />
            </Switch>
        </>
    )
}

export default ItemRoute