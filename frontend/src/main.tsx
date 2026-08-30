
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/app/config/queryClient.config.ts'
import { router } from '@/app/routes/index.tsx'

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
);