import { MatrixBackground } from '@/components/ui/MatrixBackground';
import FormAuth from '@/components/auth/FormAuth';
import { Suspense } from 'react';
import { Loading } from '@/components/template/Loading';

export default function LoginPage() {
  return (
    <section
      className="flex items-center justify-center min-h-screen p-4 relative font-inter overflow-hidden bg-[#050810] text-[#e0e0e0]"
    >
      <MatrixBackground />

      <Suspense fallback={<Loading />}>
        <FormAuth />
      </Suspense>
    </section>
  );
}