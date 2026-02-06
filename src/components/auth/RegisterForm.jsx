import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function RegisterForm({ onSubmit, loading }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ firstName, lastName, email, password });
      }}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <Input label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      </div>
      <Input label="Email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
      <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Minimum 6 chars" />
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
