import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Index from "./pages/Index";
import DownloadPage from "./pages/DownloadPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/download/:id" element={<DownloadPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
