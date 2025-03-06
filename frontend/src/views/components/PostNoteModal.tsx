import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNote } from "../../controllers/movieController";
import { toast } from "react-toastify";

const createNoteSchema = z.object({
    note: z.string().min(5, "Note must be at least 5 characters long").max(460),
});

const PostNoteModal = ({ open, func } : { open: boolean, func: () => void }) => {
    const { id } = useParams();
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(createNoteSchema),
    });

    const { mutate, isLoading } = useMutation({
        mutationFn: async (data: { note: string }) => await createNote(id, data),
        onSuccess: () => {
            toast.success("Note added successfully!");
            queryClient.invalidateQueries({ queryKey: ["movie"] }); // Atualiza a lista de filmes
            reset();
            func();
        },
        onError: (error) => {
            toast.error("Failed to add note!");
            console.error("Erro ao adicionar:", error);
        },
    });

    const onSubmit = (data: { note: string }) => {
        mutate(data);
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="w-[30rem] bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-4">Add a Note</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                    <input
                        {...register("note")}
                        className="w-full p-2 border border-gray-300 rounded"
                        type="text"
                        placeholder="Write your note"
                    />
                    {errors.note && <span className="text-red-500">{errors.note.message}</span>}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? "Adding..." : "Add Note"}
                    </button>
                </form>

                <div className="flex justify-center mt-4">
                    <button
                        onClick={func}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostNoteModal;
