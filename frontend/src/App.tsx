import { createSignal } from 'solid-js';
import LoginForm from './pages/login/Login';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <>
      <LoginForm />
    </>
  );
}

export default App;
