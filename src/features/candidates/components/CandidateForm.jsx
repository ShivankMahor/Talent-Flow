import { useState } from "react";
import { CandidateSchema } from "../schema/CandidateSchema";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";

const stages = [
  { value: "applied", label: "Applied" },
  { value: "screen", label: "Screen" },
  { value: "tech", label: "Technical" },
  { value: "offer", label: "Offer" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

export default function CandidateForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    stage: "applied",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    console.log("Button")
    try {
      // ✅ Validate with Zod
      const parsed = CandidateSchema.parse(formData);

      // Call parent handler
      await onSubmit(parsed);

      // Reset form on success
      setFormData({ name: "", email: "", stage: "applied" });
      if (onCancel) {
        onCancel();
      }
    } catch (err) {
      if (err.name === "ZodError") {
        const fieldErrors = {};
        err.errors.forEach((zErr) => {
          fieldErrors[zErr.path[0]] = zErr.message;
        });
        setErrors(fieldErrors);
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)]"
    >
      <Input
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="John Doe"
        required
      />
      {errors.name && (
        <p className="text-sm text-[var(--color-danger)]">{errors.name}</p>
      )}

      <Input
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="email@example.com"
        required
      />
      {errors.email && (
        <p className="text-sm text-[var(--color-danger)]">{errors.email}</p>
      )}

      <Select
        label="Stage"
        name="stage"
        value={formData.stage}
        onChange={handleChange}
        options={stages}
      />
      {errors.stage && (
        <p className="text-sm text-[var(--color-danger)]">{errors.stage}</p>
      )}

      <Button type="submit" loading={loading} className="w-full">
        Add Candidate
      </Button>
    </form>
  );
}
