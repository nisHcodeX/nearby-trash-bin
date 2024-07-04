
import { createBrowserRouter, RouteObject } from 'react-router-dom';

import TrashBinLogin from '@pages/login'
import TrashBinHome from '@pages/home'
import TrashBinSingIn from '@pages/signin';
import TrashBinWrapper from '@components/header';
import TrashBinProfile from '@pages/profile';
import TrashBinLanding from '@pages/landing';
import TrashBinContactUs from '@pages/contactUs';
import TrashBinAboutUs from '@pages/aboutUs';
import AddTrashBin from '@pages/addTrashBin';
import FindTrashBin from '@pages/findTrashbin';

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <TrashBinWrapper><TrashBinLogin /></TrashBinWrapper>,
  },
  {
    path: "/signin",
    element: <TrashBinWrapper><TrashBinSingIn /></TrashBinWrapper>,
  },
  {
    path: "/profile",
    element: <TrashBinWrapper><TrashBinProfile /></TrashBinWrapper>,
  },
  {
    path: "/",
    element: <TrashBinWrapper><TrashBinHome /></TrashBinWrapper>,
  },
  {
    path: "/landing",
    element: <TrashBinWrapper><TrashBinLanding /></TrashBinWrapper>,
  },
  {
    path: "/aboutus",
    element: <TrashBinWrapper><TrashBinAboutUs /></TrashBinWrapper>,
  },
  {
    path: "/contactus",
    element: <TrashBinWrapper><TrashBinContactUs /></TrashBinWrapper>,
  },
  {
    path: "/addtrashbin",
    element: <TrashBinWrapper><AddTrashBin /></TrashBinWrapper>,
  },
  {
    path: "/findtrashbin",
    element: <TrashBinWrapper><FindTrashBin /></TrashBinWrapper>,
  },
  {
    path: "*",
    element: <TrashBinWrapper><>Error</></TrashBinWrapper>,
  }
];

const router = createBrowserRouter(routes)

export default router;