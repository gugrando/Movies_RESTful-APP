import MovieList from "../layouts/MovieList.tsx" ;
import { useState } from "react";
import PostFormModal from "../components/PostFormModal.tsx";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../controllers/movieController";
import { number } from "zod";
export default function Home() {
    
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
      setOpenModal(!openModal);
    }

    return (
      <>
        <div className="w-full h-fit flex flex-col items-center">
          <div className="w-full h-[30rem] bg-neutral-400 flex flex-col items-center">
            <div className="w-full h-fit flex flex-col items-center ">
              <button className="w-[20rem] bg-neutral-300 text-gray-900 font-medium px-4 py-3 rounded-md cursor-pointer mt-[20rem]" onClick={handleOpenModal}>
                Create Movie
              </button>
            </div>
            
            {openModal && <PostFormModal open={openModal} func={handleOpenModal} />}
          </div>
          <div className="w-full h-[50rem]">
            <MovieList />
          </div>
        </div>
      </>
    );
  }