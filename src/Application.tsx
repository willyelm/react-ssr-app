import {
  FunctionComponent,
  ReactElement,
  ReactNode,
  createContext,
  useContext
} from 'react';
import { renderToString } from 'react-dom/server';

export interface ApplicationContext {
  head?: ReactNode;
  location?: string;
  isServer?: boolean;
};

export const ApplicationContext = createContext<ApplicationContext>({});

export function useApplication(app: ReactElement) {
  const context = useContext(ApplicationContext);
  const root = renderToString(app);
  context.isServer = true;
  return {
    Head() {
      return context?.head;
    },
    Root(params: { id?: string, className?: string }) {
      return <div
        id={params.id || 'root'}
        className={params.className}
        dangerouslySetInnerHTML={{ __html: root }}></div>;
    }
  };
}

export interface Head {
  children?: ReactNode;
}

export const Head: FunctionComponent<Head> = ({
  children
}) => {
  const context = useContext(ApplicationContext);
  if (context?.isServer) {
    context.head = children;
  }
  return null;
}
