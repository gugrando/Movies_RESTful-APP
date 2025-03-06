import api from "../models/api";

interface Movie {
    _id: string;
    title: string;
    rating: number;
    description: string;
    director: string;
    stars?: string[]; 
    poster: string;
    banner: string;
    createdAt: string; 
    updatedAt: string;
}

interface PaginatedMovies {
    movies: Movie[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalMovies: number;
    };
}

async function getMovies(page: number = 1, limit: number = 10): Promise<PaginatedMovies> {
    try {
        // Envia os parâmetros de paginação para a API
        const response = await api.get("/movie", {
            params: { page, limit }, // Passando os parâmetros de página e limite
        });

        return response.data; // Retorna os dados com a lista de filmes e informações de paginação
    } catch (error) {
        console.error("Erro ao buscar filmes:", error);
        return { movies: [], pagination: { currentPage: 1, totalPages: 0, totalMovies: 0 } }; // Retorna dados vazios em caso de erro
    }
}

async function getMovieById(id: string) {
    try {
        const response = await api.get(`movie/${id}`)
        return response.data
    } catch (error) {
        console.error("Erro ao buscar filme:", error);
        throw new Error("Movie not found!");
    }
}

async function editMovie(id: string, data: Movie) {
    try {
        const response = await api.patch(`movie/${id}`, data)
        return response.data
    } catch (error) {
        console.error("Erro ao editar filme:", error);
        throw new Error("Movie not found!");
    }
}

interface Movie {
    title: string;
    rating: number;
    description: string;
    director: string;
    stars?: string[]; 
    poster: string;
    banner: string;
    createdAt: string; 
    updatedAt: string;
}

async function postMovie(data: Movie) {
    try {
        const response = await api.post("/movie", data)
        return response.data
    } catch (error: any) {
        if (error.response) {
            console.error("Erro na resposta da API:", error.response.data);
            throw new Error(error.response.data.message || "Erro desconhecido no backend");
        } else if (error.request) {
            console.error("Erro na requisição:", error.request);
            throw new Error("Nenhuma resposta do servidor");
        } else {
            console.error("Erro ao configurar requisição:", error.message);
            throw new Error(error.message);
        }
    }
}
    

async function deleteMovie(id: string) {
    try {
        const response = await api.delete(`movie/${id}`)
        return response.data
    } catch (error) {
        console.error("Erro ao deletar filme:", error);
        throw new Error("Movie not found!");
    }
}

async function createNote(movieId: string, data: { note: string }) {
    try {
        const response = await api.post(`movie/${movieId}/note`, data)
        return response.data
    } catch (error) {
        console.error("Erro ao criar nota:", error);
        throw new Error("Movie not found!");
    }
}


export { getMovieById, deleteMovie, getMovies, postMovie, editMovie, createNote };
export type { Movie };
