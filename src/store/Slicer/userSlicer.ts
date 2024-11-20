import { IUser } from '../../interface';
import { addUserFirebase, changeUserUsernameFirebase, deleteUserFirebase, getAllUser } from "../../firebase-config";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: IUser[];
  showModal: boolean;
}

const userSlicer = createSlice({
  name: "users",
  initialState: { users: [], showModal: false } as UserState,
  reducers: {
    handleShow: (state) => {
      state.showModal = true;
    },
    handleClose: (state) => {
      state.showModal = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(
      allUsersData.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        state.users = action.payload;
      }
    )
    .addCase(
        addUser.fulfilled,
        (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
        }
    )
    .addCase(
        deleteUser.fulfilled,
        (state, action: PayloadAction<string>) => {
            state.users = state.users.filter((user) => user.id !== action.payload); 
        }
    )
    .addCase(
        changeUsername.fulfilled,
        (state, action: PayloadAction<{id: string; newUsername: string}>) => {
           const user = state.users.find((user) => user.id === action.payload.id);
           if(user) {
            user.username = action.payload.newUsername;
           }
        }   
    );
  },
});

export const allUsersData = createAsyncThunk(
  "usersRedux/allUsersData",
  async () => {
    const users = await getAllUser();
    return users;
  }
);

export const addUser = createAsyncThunk(
  "usersRedux/addUser",
  async (user: IUser) => {
    await addUserFirebase(user);
    return user;
  }
);

export const deleteUser = createAsyncThunk(
    "usersRedux/deleteUser",
    async (id: string) => {
        await deleteUserFirebase(id);
        return id;
    }
)

export const changeUsername = createAsyncThunk(
    "usersRedux/changeUsername",
    async ({id, newUsername}:{id: string, newUsername: string}) => {
        await changeUserUsernameFirebase(id, newUsername);
        return {id, newUsername};
    }
)

export const { handleShow, handleClose } = userSlicer.actions;
export default userSlicer.reducer;
