import { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";

export default function CreateAccountModal({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [initialBalance, setInitialBalance] = useState("");

  const reset = () => {
    setName("");
    setInitialBalance("");
  };

  return (
    <Modal open={open} onClose={() => { reset(); onClose(); }} title="Create Account">
      <div className="space-y-4">
        <Input label="Account name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Cash / Bank / UPI" />
        <Input label="Initial balance" type="number" value={initialBalance} onChange={(e) => setInitialBalance(e.target.value)} placeholder="e.g., 1000" />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" type="button" onClick={() => { reset(); onClose(); }}>Cancel</Button>
          <Button
            type="button"
            onClick={() => {
              onSubmit({ name, initialBalance: Number(initialBalance || 0) });
              reset();
            }}
            disabled={!name}
          >
            Create
          </Button>
        </div>
      </div>
    </Modal>
  );
}
