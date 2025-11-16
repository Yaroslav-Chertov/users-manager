import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import * as usersApi from "../../api/usersApi";
import type { User } from "./types";

type State = {
  list: User[];
  loading: boolean;
  error: string | null;
  total?: number;
  page: number;
  limit: number;
  selected?: User | null;
};

const initialState: State = {
  list: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  selected: null,
};

export const loadUsers = createAsyncThunk(
  "users/load",
  async ({ page, limit }: { page: number; limit: number }) => {
    const res = await usersApi.fetchUsers(page, limit);
    const total = Number(res.headers["x-total-count"]) || res.data.length;
    return { data: res.data, total };
  }
);

export const loadUser = createAsyncThunk(
  "users/loadOne",
  async (id: string) => {
    return await usersApi.fetchUser(id);
  }
);

export const addUser = createAsyncThunk(
  "users/add",
  async (user: Partial<User>) => {
    return await usersApi.createUser(user);
  }
);

export const editUser = createAsyncThunk(
  "users/edit",
  async ({ id, user }: { id: string; user: Partial<User> }) => {
    return await usersApi.updateUser(id, user);
  }
);

export const removeUser = createAsyncThunk(
  "users/remove",
  async (id: string) => {
    return await usersApi.deleteUser(id);
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload.data)
          ? action.payload.data
          : [];
        state.total = action.payload.total;
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.list = state.list.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u.id !== action.meta.arg);
      });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;
