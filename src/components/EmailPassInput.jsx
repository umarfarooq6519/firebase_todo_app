export default function EmailPassInput({ email, setEmail, pass, setPass }) {
  return (
    <>
      <input
        type='text'
        placeholder='example@website.com'
        name='user_email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type='password'
        placeholder='password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        name='user_pass'
        required
      />
    </>
  );
}
