import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate localStorage user database
const USERS_KEY = "mock_users";

const getStoredUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) =>
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const register = createAsyncThunk("auth/register", async (userData) => {
  const users = getStoredUsers();
  const exists = users.find((u) => u.username === userData.username);
  if (exists) throw new Error("Username already exists");

  const newUser = { ...userData, id: Date.now() };
  users.push(newUser);
  saveUsers(users);
  return newUser;
});

export const login = createAsyncThunk("auth/login", async (userData) => {
  const users = getStoredUsers();
  const user = users.find(
    (u) => u.username === userData.username && u.password === userData.password
  );

  if (!user) throw new Error("Invalid username or password");

  localStorage.setItem("token", user.id);
  return user;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
