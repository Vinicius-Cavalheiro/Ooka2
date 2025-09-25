import react from 'react'
import Image from 'next/image'

 export default function HomeOka(){
  return(
     <>
          <div className="flex min-h-screen flex-col">
            <section className="flex grow items-center justify-center bg-gray-50 py-8 dark:bg-gray-900">
              <div className="container mx-auto flex flex-col items-center justify-center px-6">
                <a
                  href="#"
                  className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
                >
                  <Image
                    className="mr-2"
                    src={
                      "https://oka.arandu.studio/wp-content/uploads/2024/11/logo-light.svg"
                    }
                    alt="logo"
                    width={150}
                    height={80}
                  />
                </a>
                <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
                  <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            
                    </h1>
                    
                      <div></div></div></div></div></section></div></>
  )};

