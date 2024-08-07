import { Children, createContext, ReactNode, useReducer } from "react";
import { bookData, bookDataType } from "../assets/data";

interface BookContextProps {
    children: ReactNode;
}

interface BookState {
    books: bookDataType[];
}

interface BookAction {
    type: string;
    id: string;
}

const BookList: bookDataType[] = bookData;

const initalBookState: BookState = {
    books: BookList,
}

const BookReducer = (state: BookState, action: BookAction): BookState => {
    switch (action.type) {
        case "TOOGLE BOOKMARK":
            return {
                ...state,
                books: state.books.map((book) => {
                    if (book.id === action.id){
                        return{ ...book, isFavorite: !book.isFavorite };
                    }
                    return book;
            }),
    };
    default:
        return state;
}
}


export const BookContext = createContext<{
    state: BookState;
    dispatch: React.Dispatch<BookAction>;
}>({
    state: initalBookState,
    dispatch: () => { },
});

export const BookProvider = ({ children }: BookContextProps) => {
    const [state, dispatch] = useReducer(BookReducer, initalBookState);
    return (
        <BookContext.Provider value={{ state, dispatch }}>{children}</BookContext.Provider>
    )
}