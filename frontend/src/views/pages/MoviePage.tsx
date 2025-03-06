import { useParams } from "react-router-dom";
import { getMovieById } from "../../controllers/movieController";
import { useQuery } from '@tanstack/react-query'
import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link} from "react-router-dom";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ModalDelete from "../components/DeleteModal.tsx";
import PostFormModal from "../components/PostFormModal.tsx";
import { Movie } from "../../controllers/movieController";
import PostNoteModal from "../components/PostNoteModal.tsx";
const MoviePage = () => {
    const id = useParams();
    const {data: movie, isLoading, error} = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieById(id.id),
        enabled: !!id,
        retry: false,
    });

    const [openDelete, setOpenDelete] = useState(false);
    const handleDeleteOpen = () => {
        setOpenDelete(!openDelete);
    }

    const [openEdit, setOpenEdit] = useState(false);
    const [editMovie, setEditMovie] = useState<Movie | null>(null);
    const [openNote, setOpenNote] = useState(false);

const handleNoteOpen = () => {
    setOpenNote(!openNote);
}

    const handleEditOpen = () => {
        setOpenEdit(!openEdit);
        setEditMovie(movie);
    }

    useEffect(() => {
        if (error) {
            toast.error("Filme não encontrado!", {
                toastId: "movie-not-found", // Evita alertas duplicados
            });
        }
    }, [error]); 

    if (isLoading) {
        return (
            <>
                <div className="w-full h-[43rem] flex justify-center items-center">
                    <h1 className="text-3xl font-bold text-gray-300">Loading...</h1>
                </div>
            </>
        )
    }

    

    
return (
    <>
        {error ? (
            <motion.div className="w-full h-[43rem] flex justify-center items-center">
                <motion.div className="w-full h-full flex flex-col justify-center items-center">
                    <motion.h1 whileInView={{x: 0}} initial={{x: 100}} transition={{duration: 0.3}} className="text-3xl font-bold">🎬 Movie not found!</motion.h1>
                    <motion.p whileInView={{x: 0}} initial={{x: 100}} transition={{duration: 0.3, delay: 0.1}}>This movie doesn't exist or isn't available</motion.p>
                    <motion.div whileInView={{x: 0}} initial={{x: 10}} transition={{duration: 0.3, delay: 0.2}} className="w-fit h-fit mt-6">
                        <Link to="/" className="text-blue-500 px-6 py-3 bg-blue-200 rounded-sm">Go back to home</Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        ) : (
            <motion.div className="full h-screen bg-gray-800">
                
                {openDelete && <ModalDelete open={openDelete} func={handleDeleteOpen} name={movie?.title}/>}
                {openEdit && <PostFormModal open={openEdit} func={handleEditOpen} movie={editMovie} />}
                {openNote && <PostNoteModal open={openNote} func={handleNoteOpen} />}

                <motion.div className="relative w-full h-fit flex flex-col justify-center items-center bg-gray-800">
                    <motion.div className="w-full h-[25rem] flex justify-center items-center">
                        <motion.img className="w-full h-full blur-[3px] saturate-0" src={movie?.banner}></motion.img>
                        <motion.img className="absolute top-[10rem] w-[18rem] h-[23rem] bg-red-900" src={movie?.poster} alt="Movie poster"></motion.img>
                    </motion.div>
                    <motion.div className="mt-34 flex-col justify-center text-center">
                        <motion.div className="flex w-full justify-center gap-2">
                            <motion.h1 className="text-3xl font-bold text-white">{movie?.title}</motion.h1>
                            <motion.div className="mt-2">
                                {movie?.rating < 4.5 ? (
                                    <motion.p className="text-red-500 font-bold">{movie?.rating}</motion.p>
                                ) : (
                                    <motion.p className="text-green-500 font-bold">{movie?.rating}</motion.p>
                                ) 
                            }
                            </motion.div>
                        </motion.div>
                        <motion.p className="text-gray-300 mt-1 text-sm">{movie?.director}</motion.p>
                        {/* <motion.p className="text-gray-300 mt-8 max-w-[25rem]">{movie?.description}</motion.p> */}
                        
                        <motion.div className="w-full flex justify-center gap-4">
                            <motion.div onClick={handleDeleteOpen} className="cursor-pointer w-[3rem] h-[3rem] flex justify-center items-center bg-white rounded-sm mt-8 hover:scale-[102%] transition-all hover:transition-all">
                                <MdDelete className="text-4xl" />
                            </motion.div>
                            <motion.div onClick={handleNoteOpen} className="cursor-pointer w-[6rem] h-[3rem] flex justify-center items-center bg-white rounded-sm mt-8 hover:scale-[102%] transition-all hover:transition-all">
                                <FaPlus className="text-3xl" />
                            </motion.div>
                            <motion.div onClick={handleEditOpen} className="cursor-pointer w-[3rem] h-[3rem] flex justify-center items-center bg-white rounded-sm mt-8 hover:scale-[102%] transition-all hover:transition-all">
                                <MdEdit className="text-4xl" />
                            </motion.div>
                        </motion.div>

                        <div>
                            {movie.notes.map((note) => (
                                <div>
                                    <p>{note.note}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        )}
    </>
    );
}
 
export default MoviePage;