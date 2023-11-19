import { useRouter } from 'expo-router';
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
  isLoaded: boolean;
  authState: AuthType;
  setAuthState?: (authState: AuthType) => void;
  logout?: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({
  authState: 'none',
  isLoaded: true,
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
  const router = useRouter();
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
        isLoaded: true,
        authState,
        setAuthState: async (authState: AuthType) => {
          setAuthState(authState);
          await SecureStore.setItemAsync('auth-state', authState);
          if (authState === 'none') {
            await SecureStore.deleteItemAsync('child');
          }
        },
        logout: async () => {
          setAuthState('none');
          SecureStore.deleteItemAsync('child');
          SecureStore.deleteItemAsync('onbst');
          SecureStore.deleteItemAsync('auth-state');
          
          //TODO: This is a hack to reset the router stack
          //🤮🤮🤮🤮🤮🤮
          while (router.canGoBack()) {
            router.back();
          }
          router.replace('/');
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
