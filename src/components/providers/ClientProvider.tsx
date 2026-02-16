'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//Internal app
import { ChildrenProps } from '@/interfaces';

const queryClient = new QueryClient();

export default function ClientProvider({ children }: ChildrenProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
