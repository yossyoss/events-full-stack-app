import { createRoot } from "react-dom/client";
import { ThemeProvider } from '@mui/material/styles';
import TableWithFilter from './components/TableWithFilter'
import Title from './components/Title'
import Header from './components/Header'
import theme from './utils/theme'


const App = () => {

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Header>
          <Title>Event Table</Title>
        </Header>
        <TableWithFilter />
      </ThemeProvider>

    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
