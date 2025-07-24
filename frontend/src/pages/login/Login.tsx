import { createSignal } from 'solid-js';
import './Login.css';

const facebookOauth2URL = import.meta.env.VITE_FACEBOOK_OATH2;

export default function LoginForm() {
  const [firstName, setFirstName] = createSignal<string>('');
  const [lastName, setLastName] = createSignal<string>('');  
  const [middleName, setMiddleName] = createSignal<string>('');
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
          placeholder="First Name"
          value={firstName()}
          onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName()}
          onInput={(e) => setLastName((e.target as HTMLInputElement).value)}
        />

        
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName()}
          onInput={(e) => setMiddleName((e.target as HTMLInputElement).value)}
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
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_Logo.svg"
            alt="Google"
            width="20"
            height="20"
            style="margin-right: 0.5rem;"
          />
          Continue with Google
        </button>
      </form>
    </div>
  );
}
