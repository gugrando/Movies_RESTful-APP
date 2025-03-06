import { deleteMovie } from "../../controllers/movieController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteModal = ({ open, func, name }) => {
    const { id } = useParams();
    const queryClient = useQueryClient(); // Para invalidar o cache

    // Configuração da mutação
    const { mutate } = useMutation({
        mutationFn: async () => await deleteMovie(id),
        onSuccess: () => {
            toast.success(`Movie "${name}" deleted successfully!`);
            queryClient.invalidateQueries({ queryKey: ["movies"] }); // Invalida cache para atualizar lista
            func();
        },
        onError: (error) => {
            toast.error("Failed to delete movie!");
            console.error("Erro ao excluir:", error);
        },
    });

    return (
        <>
            {open && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">Tem certeza de que deseja excluir?</h2>
                        <div className="flex justify-end">
                            <Link to={`/`}>
                                <button onClick={() => mutate()} className="bg-red-500 text-white px-4 py-2 rounded mr-2">
                                    Sim
                                </button>
                            </Link>
                            <button onClick={func} className="bg-gray-500 text-white px-4 py-2 rounded">
                                Não
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DeleteModal;
