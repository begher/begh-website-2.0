export default function Services() {
  return (
    <div>
      <h1 className='mb-4 text-2xl font-medium'>Services</h1>

      <h2 className='mb-2 font-medium'>Online:</h2>
      <button className='w-full relative h-[74px] py-6 px-4 group transition border duration-200 border-begh-gray max-w-96 rounded-lg hover:shadow-begh-success-hover shadow-begh-success'>
        <p className='absolute transition duration-200 top-1/2 -translate-y-1/2 group-hover:translate-x-1/2 translate-x-[0%] ease-in-out'>
          /customer-service/
        </p>
      </button>
    </div>
  );
}
