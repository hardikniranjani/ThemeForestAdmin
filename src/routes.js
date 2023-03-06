/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
// import Tables from "layouts/tables";
// import Billing from "layouts/billing";
// import RTL from "layouts/rtl";
// import Notifications from "layouts/notifications";
// import Profile from "layouts/profile";
// import SignIn from "layouts/authentication/sign-in";
// import SignUp from "layouts/authentication/sign-up";
import Authors from './Pages/Author/index.jsx'
import Users from './Pages/User/index.jsx';
import Items from "Pages/Items/index.jsx";

// Import Item details router 
import Plugins from './Pages/ItemDetails/CompatibleWith/index.jsx';
import Browsers from './Pages/ItemDetails/CompatibleBrowsers/index.jsx';
import Files from './Pages/ItemDetails/FilesIncluded/index.jsx';
import Softwares from './Pages/ItemDetails/SoftwareVersion/index.jsx';
import Tags from './Pages/ItemDetails/Tags/index.jsx';


// End of Item details router


// @mui icons
import Icon from "@mui/material/Icon";

import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ExtensionIcon from '@mui/icons-material/Extension';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import StyleIcon from '@mui/icons-material/Style';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    icon: <PersonOutlineIcon />,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Authors",
    key: "authors",
    icon: <AccountBoxIcon />,
    route: "/authors",
    component: <Authors />,
  },

  {
    type: "collapse",
    name: "Items",
    key: "items",
    icon: <ProductionQuantityLimitsIcon />,
    route: "/items",
    component: <Items />,
  },
    // Item Details stater
  {
    type: "collapse",
    name: "Items-Details",
    key: "item-detail",
    icon: <AccountTreeIcon />,
    route: "/item-detail/plugin",
    component: <Items />,
  },
  // Item Details Router Start
  {
    type: "collapse",
    name: "Plugins",
    key: "item-detail/plugin",
    icon: <ExtensionIcon />,
    route: "/item-detail/plugin",
    component: <Plugins />,
  },
  {
    type: "collapse",
    name: "Browsers",
    key: "item-detail/browsers",
    icon: <BrowserUpdatedIcon />,
    route: "/item-detail/browsers",
    component: <Browsers />,
  },
  {
    type: "collapse",
    name: "Files",
    key: "item-detail/files",
    icon: <InsertDriveFileIcon />,
    route: "/item-detail/files",
    component: <Files />,
  },
  {
    type: "collapse",
    name: "Softwares",
    key: "item-detail/softwares",
    icon: <WysiwygIcon />,
    route: "/item-detail/softwares",
    component: <Softwares />,
  },
  {
    type: "collapse",
    name: "Tags",
    key: "item-detail/tags",
    icon: <StyleIcon />,
    route: "/item-detail/tags",
    component: <Tags />,
  },
  // Item Details Router End

  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/profile",
  //   component: <Profile />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
