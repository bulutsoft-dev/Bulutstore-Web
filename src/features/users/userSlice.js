// userSlice.js
// Kullanıcılar ile ilgili global state yönetimi ve asenkron işlemler için Redux slice.
// Bu dosya, kullanıcı listesini çekmek için async thunk ve slice tanımlarını içerir.
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from '../../api/userApi';

/**
 * Kullanıcı listesini API'den asenkron olarak çeken thunk fonksiyonu.
 * Durumlar: pending (yükleniyor), fulfilled (başarılı), rejected (hata)
 */
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await userApi.getUsers();
});

/**
 * userSlice: Kullanıcılar için global state ve reducer'ları tanımlar.
 * - items: Kullanıcı listesi
 * - status: 'idle' | 'loading' | 'succeeded' | 'failed'
 * - error: Hata mesajı (varsa)
 */
const userSlice = createSlice({
  name: 'users',
  initialState: {
    items: [], // Kullanıcı listesi
    status: 'idle', // Yüklenme durumu
    error: null, // Hata mesajı
  },
  reducers: {}, // Senkron reducer'lar (gerekirse eklenebilir)
  extraReducers: (builder) => {
    builder
      // Kullanıcılar yükleniyor
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      // Kullanıcılar başarıyla yüklendi
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      // Kullanıcılar yüklenirken hata oluştu
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
