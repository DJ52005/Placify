import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import interviewService from './interviewService';

const initialState = {
  conversation: [
    {
      role: 'ai',
      text: "Welcome to your AI Study Buddy! Ask me anything about your subjects, or I can quiz you. What would you like to do?",
    },
  ],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Ask a question
export const askQuestion = createAsyncThunk(
  'interview/ask',
  async (questionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await interviewService.askQuestion(questionData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get chat history
export const getHistory = createAsyncThunk(
  'interview/getHistory',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await interviewService.getHistory(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const interviewSlice = createSlice({
  name: 'interview',
  initialState,
  reducers: {
    reset: (state) => {
      state.conversation = initialState.conversation;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
    addUserMessage: (state, action) => {
      state.conversation.push({ role: 'user', text: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(askQuestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(askQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.conversation.push({ role: 'ai', text: action.payload.answer });
      })
      .addCase(askQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.conversation.push({ role: 'ai', text: 'Sorry, I encountered an error. Please try again.' });
      })
      .addCase(getHistory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // If there's a history, replace the initial message with it
        if (action.payload.length > 0) {
            state.conversation = action.payload;
        }
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, addUserMessage } = interviewSlice.actions;
export default interviewSlice.reducer;
