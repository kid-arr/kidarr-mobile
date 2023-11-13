import * as SecureStore from 'expo-secure-store';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type AuthType = 'none' | 'onboarding' | 'parent' | 'child';

type AuthState = {
  authState: AuthType;
  setAuthState?: (authState: AuthType) => void;
};

const AuthContext = createContext<AuthState>({
  authState: 'none',
});

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return authContext;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthType>('none');

  useEffect(() => {
    const getStorage = async () => {
      const onboarded =
        (await SecureStore.getItemAsync('auth-state')) || 'onboarding';
      setAuthState(onboarded as AuthType);
    };
    getStorage();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        authState,
        setAuthState: async (authState: AuthType) => {
          setAuthState(authState);
          await SecureStore.setItemAsync('auth-state', authState);
          if (authState === 'none') {
            await SecureStore.deleteItemAsync('child');
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
