import { createContext } from 'react';
import type { User, Session, AuthResponse, AuthError } from '@supabase/supabase-js';

export interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signUp: (
        email: string,
        password: string
    ) => Promise<{
        data: AuthResponse['data'];
        error: AuthError | null;
    }>;
    signIn: (
        email: string,
        password: string
    ) => Promise<{
        data: AuthResponse['data'];
        error: AuthError | null;
    }>;
    signOut: () => Promise<{
        error: AuthError | null;
    }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
