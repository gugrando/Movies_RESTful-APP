import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { editMovie, postMovie, Movie } from "../../controllers/movieController";
import { toast } from "react-toastify";
import { useEffect } from "react";

type PostFormModalProps = {
  open: boolean;
  func: () => void;
  movie?: Movie; // Se existir, o formulário estará no modo edição
};

const PostFormModal = ({ open, func, movie }: PostFormModalProps) => {
  const errorSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long").max(50),
    description: z.string().min(5).max(160),
    director: z.string().min(5).max(50),
    rating: z.preprocess((val) => Number(val), z.number().min(0).max(10)),
    poster: z.string().url("Poster must be a valid URL"),
    banner: z.string().url("Banner must be a valid URL"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue, // Adicionado para atualizar valores no modo edição
  } = useForm<Movie>({
    resolver: zodResolver(errorSchema),
    defaultValues: {
      title: "",
      rating: 0,
      description: "",
      director: "",
      poster: "",
      banner: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: Movie) => {
      return movie ? await editMovie(movie._id, data) : await postMovie(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["movies"]); // Atualiza a lista
      toast.success(movie ? "Movie updated successfully!" : "Movie created successfully!");
      func();
      reset();
    },
    onError: (error) => {
      toast.error("Failed to submit movie!");
      console.error("Erro ao salvar filme:", error);
    },
  });

  // Atualiza os valores do formulário no modo edição
  useEffect(() => {
    if (movie) {
      setValue("title", movie.title);
      setValue("rating", movie.rating);
      setValue("description", movie.description);
      setValue("director", movie.director);
      setValue("poster", movie.poster);
      setValue("banner", movie.banner);
    }
  }, [movie, setValue]);

  useEffect(() => {
    Object.values(errors).forEach((error) => {
      if (error?.message) toast.error(error.message);
    });
  }, [errors]);

  const onSubmit = (data: Movie) => {
    if (movie) {
      // Filtra apenas os campos modificados para comparar
      const hasChanges = Object.keys(data).some((key) => data[key as keyof Movie] !== movie[key as keyof Movie]);
  
      if (!hasChanges) {
        toast.info("No changes detected.");
        return; // Não envia a requisição se nada foi alterado
      }
    }
  
    mutation.mutate(data);
  };
  

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="w-[30rem] h-[30rem] bg-white p-4 rounded-lg">
            <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} placeholder="Movie Title" />
              <input {...register("rating")} placeholder="Movie Rating" type="number" />
              <input {...register("description")} placeholder="Movie Description" />
              <input {...register("director")} placeholder="Movie Director" />
              <input {...register("poster")} placeholder="Poster URL" />
              <input {...register("banner")} placeholder="Banner URL" />

              <button type="submit" disabled={mutation.isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
                {mutation.isLoading ? "Enviando..." : movie ? "Atualizar" : "Criar"}
              </button>
            </form>

            <div className="flex justify-center items-center w-full h-fit">
              <button onClick={func} className="bg-red-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostFormModal;
