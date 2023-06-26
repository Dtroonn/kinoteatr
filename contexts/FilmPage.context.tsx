import React from "react";
import { IFilm } from "types/film.interface";

export interface IFilmPageContext {
    film: IFilm
}

export const FilmPageContext = React.createContext<IFilmPageContext>({
    film: {} as IFilm,
})

export const FilmPageContextProvider: React.FC<React.PropsWithChildren<IFilmPageContext>> = ({film, children}) => {
    return <FilmPageContext.Provider value={{film}}>
        {children}
    </FilmPageContext.Provider>
}