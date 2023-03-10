import "./App.css";
import TextEditor from "./Page/text-editor";
import { NativeBaseProvider, Box } from "native-base";
function App() {
  return (
    <NativeBaseProvider>
      <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
        <TextEditor />
      </Box>
    </NativeBaseProvider>
  );
}

export default App;