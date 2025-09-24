// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import Input from "../../../components/Input";
// import Select from "../../../components/Select";
// import { jobSchema } from "../schemas/jobSchema";

// export default function JobForm({ onSubmit, onCancel, initialData = null }) {
//   const blank = { title: "", slug: "", status: "active", tags: "", order: "" };
//   const [form, setForm] = useState(blank);
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     if (initialData) {
//       setForm({
//         title: initialData.title || "",
//         slug: initialData.slug || "",
//         status: initialData.status || "active",
//         tags: (initialData.tags || []).join(", "),
//         order: initialData.order ?? "",
//       });
//       setErrors({});
//     } else {
//       setForm(blank);
//     }
//   }, [initialData]);

//   const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const tagsArray = form.tags
//       ? form.tags.split(",").map(t => t.trim()).filter(Boolean)
//       : [];
//     const payload = {
//       title: form.title,
//       slug: form.slug,
//       status: form.status,
//       tags: tagsArray,
//       order: Number(form.order),
//     };

//     try {
//       const parsed = jobSchema.parse(payload);
//       onSubmit(parsed);
//       // Note: toasts for success/failure handled by the caller (JobsList or Toolbar)
//     } catch (err) {
//       if (err.errors) {
//         const zodErrors = {};
//         err.errors.forEach(e => { zodErrors[e.path[0]] = e.message; });
//         setErrors(zodErrors);
//         toast.error("Please fix the form errors");
//       } else {
//         console.log(err)
//         toast.error("Unexpected validation error", err);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input label="Job Title" value={form.title} onChange={e => handleChange("title", e.target.value)} error={errors.title} required />
//       <Input label="Slug" value={form.slug} onChange={e => handleChange("slug", e.target.value)} error={errors.slug} required />
//       <Select label="Status" value={form.status} onChange={e => handleChange("status", e.target.value)}
//         options={[{value:"active",label:"Active"},{value:"archived",label:"Archived"}]} />
//       <Input label="Tags (comma separated)" value={form.tags} onChange={e => handleChange("tags", e.target.value)} />
//       <Input label="Order" type="number" value={form.order} onChange={e => handleChange("order", e.target.value)} error={errors.order} required />
//       <div className="flex justify-end gap-2">
//         <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
//         <button type="submit" className="btn-primary">{initialData ? "Save changes" : "Create Job"}</button>
//       </div>
//     </form>
//   );
// }



import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../../../components/Input";
import Select from "../../../components/Select";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import { jobSchema } from "../schemas/jobSchema";

export default function JobForm({ onSubmit, onCancel, initialData = null }) {
  const blank = {
    title: "",
    slug: "",
    status: "active",
    tags: "",
    order: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    experience: "",
    type: "",
  };

  const [form, setForm] = useState(blank);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        slug: initialData.slug || "",
        status: initialData.status || "active",
        tags: (initialData.tags || []).join(", "),
        order: initialData.order ?? "",
        company: initialData.company || "",
        location: initialData.location || "",
        salary: initialData.salary || "",
        description: initialData.description || "",
        experience: initialData.experience || "",
        type: initialData.type || "",
      });
      setErrors({});
    } else {
      setForm(blank);
    }
  }, [initialData]);

  const handleChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = form.tags
      ? form.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: form.title,
      slug: form.slug,
      status: form.status,
      tags: tagsArray,
      order: Number(form.order),
      company: form.company,
      location: form.location,
      salary: form.salary,
      description: form.description,
      experience: form.experience,
      type: form.type,
    };

    try {
      const parsed = jobSchema.parse(payload);
      onSubmit(parsed);
    } catch (err) {
      if (err.errors) {
        const zodErrors = {};
        err.errors.forEach((e) => {
          zodErrors[e.path[0]] = e.message;
        });
        setErrors(zodErrors);
        toast.error("Please fix the form errors");
      } else {
        toast.error("Unexpected validation error");
        console.error(err);
      }
    }
  };

  return (
    <Card variant="flat"className="max-h-[75vh] overflow-y-auto p-6 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Job Title" value={form.title} onChange={(e) => handleChange("title", e.target.value)} error={errors.title} required />
        <Input label="Slug" value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} error={errors.slug} required />
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          options={[
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
          ]}
        />
        <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => handleChange("tags", e.target.value)} />
        <Input label="Order" type="number" value={form.order} onChange={(e) => handleChange("order", e.target.value)} error={errors.order} required />
        <Input label="Company" value={form.company} onChange={(e) => handleChange("company", e.target.value)} error={errors.company} />
        <Input label="Location" value={form.location} onChange={(e) => handleChange("location", e.target.value)} error={errors.location} />
        <Input label="Salary" value={form.salary} onChange={(e) => handleChange("salary", e.target.value)} error={errors.salary} />
        <Input label="Experience" value={form.experience} onChange={(e) => handleChange("experience", e.target.value)} error={errors.experience} />
        <Input label="Job Type" value={form.type} onChange={(e) => handleChange("type", e.target.value)} error={errors.type} />
        <Input label="Description" value={form.description} onChange={(e) => handleChange("description", e.target.value)} error={errors.description} />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {initialData ? "Save changes" : "Create Job"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
