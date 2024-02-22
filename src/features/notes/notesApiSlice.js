import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";


const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes : builder.query({
            query : () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id;
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes);
            },
            providesTags: (result, error, arg) => {
                if(result?.ids){
                    return [
                        {type: 'Note', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Note', id}))
                    ]
                } else return [{type: 'Note', id : 'LIST'}];
            }
        }),
        createNewNotes : builder.mutation({
            query: initialNoteData => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: "LIST"}
            ]
        }),
        updateNote: builder.mutation({
            query: initialNoteData => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialNoteData
                }
            }),
            invalidatesTags: ( result, error, arg ) => [
                { type: 'Note', id: arg.id }
            ]
        }),
        deleteNote: builder.mutation({
            query: ({id}) => ({
                url: '/notes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: ( result, error, arg ) => [
                { type: 'Note', id: arg.id }
            ]
        })
    })
})

export const {
    useGetNotesQuery,
    useCreateNewNotesMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = notesApiSlice;

export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

const selectNotesData = createSelector(
    selectNotesResult,
    noteResult => noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState);
