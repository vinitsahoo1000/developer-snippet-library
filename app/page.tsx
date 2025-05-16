"use client"
import { SideMenu } from "@/components/SideMenu";
import { SnippetGrid } from "@/components/SnippetGrid";
import Head from "next/head";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";



export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <Head>
        <title>Snippet Library</title>
    </Head>
    <div className="flex flex-col md:grid md:grid-cols-5 min-h-screen">
    <div className="hidden md:block md:col-span-1 p-4">
      <SideMenu />
    </div>

    <div className="md:hidden p-4 flex justify-between items-center bg-white shadow-md">
      <button onClick={toggleMenu} className="text-gray-600 text-2xl focus:outline-none">
        <FiMenu />
      </button>
      <h1 className="text-lg font-semibold">Snippets</h1>
    </div>

    {isMenuOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-40 z-50">
      <div className="w-1/2 bg-white h-full shadow-md p-4 relative">
        <SideMenu toggleMenu={toggleMenu} />
      </div>
    </div>
    
    )}

    <div className="flex-1 p-4 pt-0 md:col-span-4">
      <SnippetGrid />
    </div>
  </div>
  </>
  );
}
