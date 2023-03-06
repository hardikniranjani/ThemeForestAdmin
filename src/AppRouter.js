import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoutes from './Routes/PrivateRoutes';


const Users = lazy(() => import('./Pages/User/index.jsx'));
const CreateUser = lazy(() => import('./Pages/User/Create.jsx'));
const EditUser = lazy(() => import('./Pages/User/[userSlug]/edit.jsx'));

const Authors = lazy(() => import('./Pages/Author/index.jsx'));
const CreateAuthor = lazy(() => import('./Pages/Author/create.jsx'));
const EditAuthor = lazy(() => import('./Pages/Author/[authorSlug]/edit.jsx'));

const Items = lazy(() => import('./Pages/Items/index.jsx'));
// const CreateItem = lazy(() => import('./Pages/Items/'));
const EditItem = lazy(() => import('./Pages/Items/[itemSlug]/index.jsx'));


// Item Details Router Import 

const Plugins = lazy(() => import('./Pages/ItemDetails/CompatibleWith/index.jsx'));
const CreatePlugin = lazy(() => import('./Pages/ItemDetails/CompatibleWith/create.jsx'));
const EditPlugin = lazy(() => import('./Pages/ItemDetails/CompatibleWith/[Slug]/edit.jsx'));

const Browsers = lazy(() => import('./Pages/ItemDetails/CompatibleBrowsers/index.jsx'));
const CreateBrowser = lazy(() => import('./Pages/ItemDetails/CompatibleBrowsers/create.jsx'));
const EditBrowser = lazy(() => import('./Pages/ItemDetails/CompatibleBrowsers/[Slug]/edit.jsx'));

const Files = lazy(() => import('./Pages/ItemDetails/FilesIncluded/index.jsx'));
const CreateFile = lazy(() => import('./Pages/ItemDetails/FilesIncluded/create.jsx'));
const EditFile = lazy(() => import('./Pages/ItemDetails/FilesIncluded/[Slug]/edit.jsx'));

const Softwares = lazy(() => import('./Pages/ItemDetails/SoftwareVersion/index.jsx'));
const CreateSoftware = lazy(() => import('./Pages/ItemDetails/SoftwareVersion/create.jsx'));
const EditSoftware = lazy(() => import('./Pages/ItemDetails/SoftwareVersion/[Slug]/edit.jsx'));

const Tags = lazy(() => import('./Pages/ItemDetails/Tags/index.jsx'));
const CreateTag = lazy(() => import('./Pages/ItemDetails/Tags/create.jsx'));
const EditTag = lazy(() => import('./Pages/ItemDetails/Tags/[Slug]/edit.jsx'));

// End of Import of item detail router

function AppRoutes() {
    const getRoutes = (allRoutes) =>
        allRoutes.map((route) => {
            if (route.collapse) {
                return getRoutes(route.collapse);
            }

            if (route.route) {
                return <Route exact path={route.route} element={route.component} key={route.key} />;
            }

            return null;
        });

    return (
        <>
            <Suspense fallback={<div>Loading... </div>}>
                <Routes>
                    {getRoutes(PrivateRoutes)}

                    {/* Users Router */}
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/adduser" element={<CreateUser />} />
                    <Route path="/users/edituser/:id" element={<EditUser />} />

                    {/* Author Router */}
                    <Route path="/authors" element={<Authors />}></Route>
                    <Route path="/authors/addauthor" element={<CreateAuthor />} />
                    <Route path="/authors/editauthor/:id" element={<EditAuthor />} />

                    {/* Item Router */}
                    <Route path="/items" element={<Items />} />
                    {/* <Route path="/items/add" element={<CreateItem />} /> */}
                    <Route path="/items/edit/:id" element={<EditItem />} />


                    {/* All Item Details Router Start */}

                    {/* Plugin Router */}
                    <Route path="/item-detail/plugin" element={<Plugins />} />
                    <Route path="/item-detail/plugin/add" element={<CreatePlugin />} />
                    <Route path="/item-detail/plugin/edit/:id" element={<EditPlugin />} />

                    {/* Browser Router */}
                    <Route path="/item-detail/browsers" element={<Browsers />} />
                    <Route path="/item-detail/browsers/add" element={<CreateBrowser />} />
                    <Route path="/item-detail/browsers/edit/:id" element={<EditBrowser />} />

                    {/* Fils Router */}
                    <Route path="/item-detail/files" element={<Files />} />
                    <Route path="/item-detail/files/add" element={<CreateFile />} />
                    <Route path="/item-detail/files/edit/:id" element={<EditFile />} />

                    {/* Software Router */}
                    <Route path="/item-detail/softwares" element={<Softwares />} />
                    <Route path="/item-detail/softwares/add" element={<CreateSoftware />} />
                    <Route path="/item-detail/softwares/edit/:id" element={<EditSoftware />} />

                    {/* Tags Router */}
                    <Route path="/item-detail/tags" element={<Tags />} />
                    <Route path="/item-detail/tags/add" element={<CreateTag />} />
                    <Route path="/item-detail/tags/edit/:id" element={<EditTag />} />

                    {/* All Item Details Router End */}

                    {/* Page not Found */}
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Suspense>
        </>
    );

}

export default AppRoutes;