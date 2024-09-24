import Image from "next/image";
import NavBar from "./components/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="md:flex md:items-center md:justify-center">
        <h1 className="text-left md:text-center font-semibold text-6xl p-8 w-[90%] md:w-[80%] leading-tight">
          The <span className="text-white textStroke font-bold">One</span> Destination For All Your <span className="text-white textStroke font-bold">AI</span> Needs.
        </h1>
      </div>
      <div className="grid place-items-center  h-24 pt-8">
        <Link href='chat'><button className="w-48 h-14 bg-[#f9fe15] text-2xl rounded-xl  border border-black flex items-center justify-center">Chatbot <span className="text-4xl pl-4">&rarr;</span></button></Link>
      </div>
    </>
  );
}
