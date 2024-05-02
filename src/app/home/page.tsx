import Services from './Services';
import Syncronize from './Syncronize';

export default function Home() {
  return (
    <main className='grid grid-cols-2 lg:grid-cols-7 gap-4 '>
      <Services />
      <Syncronize />
    </main>
  );
}
