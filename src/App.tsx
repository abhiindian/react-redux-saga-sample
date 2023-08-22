import './App.css';
import { Box } from '@mui/material';
import { Header } from './components/Header';
import AxiosWrapper from './services/wrapper/AxiosWrapper';
import SnackbarComponent from './components/Snackbar';
import BlogPosts from './components/BlogPosts';

function App() {
  return (<>
    <AxiosWrapper>
      <SnackbarComponent />
      <div style={{ flexGrow: 1 }}>
        <Header />
        <main style={{ margin: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              marginTop: 3
            }}
          >
            <BlogPosts />
          </Box>
        </main>
      </div>
    </AxiosWrapper>
  </>
  );


}

export default App;
