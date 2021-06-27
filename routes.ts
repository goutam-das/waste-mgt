import Welcome from './screens/Welcome';
import Signup from './screens/Signup';
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
export type RootStackParamList = {
    Welcome: undefined;
    Dashboard: undefined;
    Signup: undefined;
    Login: undefined;
};

interface Route {
    title: string;
    component: any;
    options: any;
}

export default [
    {
        title: 'Welcome',
        component: Welcome
    },
    {
        title: 'Signup',
        component: Signup,
        options: {
            headerShown: false
        }
    },
    {
      title: "Login",
      component: Login,
      options: {
        headerShown: false,
      },
    },
    {
      title: "Dashboard",
      component: Dashboard,
      options: {
        headerShown: false,
      },
    },
] as Route[];
