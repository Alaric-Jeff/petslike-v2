import { createSignal } from 'solid-js';
import './Login.css';
import googleLogo from '../../assets/GoogleLogo.png'

const facebookOauth2URL = import.meta.env.VITE_FACEBOOK_OATH2;

export default function LoginForm() {
  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');

  const handleSubmit = (e: Event) => {
    e.preventDefault();
  };

  return (
    <div class="login-container">
      <form onSubmit={handleSubmit} class="login-form">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={email()}
          onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password()}
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
        />

        <button type="submit">Login</button>

        <button
          type="button"
          class="facebook-oauth"
          onClick={() => {
            window.location.href = facebookOauth2URL;
          }}
        >
          <img
            src= {googleLogo}
            alt="Google"
            width="20"
            height="20"
            style="margin-right: 0.5rem;"
          />
           Google
        </button>
      </form>
    </div>
  );
}
