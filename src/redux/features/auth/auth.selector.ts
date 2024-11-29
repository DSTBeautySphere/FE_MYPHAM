import { IAuthState } from "@/redux/features/auth/auth.slice";

interface IState {
  auth: IAuthState;
}

const selectIsAuthenticated = (state: IState) => state.auth.isAuthenticated;
const selectUser = (state: IState) => state.auth.user;

export { selectIsAuthenticated, selectUser };
