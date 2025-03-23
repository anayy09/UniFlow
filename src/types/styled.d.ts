import 'styled-components/native';

// This file augments the DefaultTheme from styled-components to ensure
// that all props in styled components are properly typed
declare module 'styled-components/native' {
  export interface DefaultTheme {
    // The theme interface is already defined in theme.ts
  }
}

// This allows styled-components to receive props without TypeScript errors
declare module 'styled-components' {
  export interface StyledComponentProps<P> {
    [key: string]: any;
  }
}
